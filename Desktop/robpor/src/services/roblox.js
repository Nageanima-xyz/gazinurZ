const CACHE_KEY = 'roblox_games_v1'
const CACHE_TTL = 30 * 60 * 1000 // 30 min

function readCache(placeIds) {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    // invalidate if games.json gained new entries since the cache was written
    const cached = new Set(data.map(g => g.placeId))
    if (!placeIds.every(id => cached.has(id))) return null
    return data
  } catch {
    return null
  }
}

function writeCache(data) {
  try {localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))} catch {}
}
// Roblox API proxy
const R = {
  thumbnails:'https://thumbnails.roproxy.com',
  apis:'https://apis.roproxy.com',
  games:'https://games.roproxy.com',
}
// fetch has no built-in timeout; AbortController enforces the 10 s limit
async function get(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'Accept-Language': 'en-US,en;q=0.9' } })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch (e) {
    clearTimeout(timer)
    throw e
  }
}
// placeId -> imageUrl
async function fetchThumbnails(placeIds) {
  const data = await get(
    `${R.thumbnails}/v1/places/gameicons?placeIds=${placeIds.join(',')}&size=512x512&format=Png&isCircular=false`
  )
  const map = {};
  (data?.data ?? []).forEach(item => {
    if (item.imageUrl) map[String(item.targetId)] = item.imageUrl
  })
  return map
}
// placeId -> universeId 
// allSettled so a single bad placeId doesn't abort the whole batch
async function fetchUniverseIds(placeIds) {
  const results = await Promise.allSettled(
    placeIds.map(id => get(`${R.apis}/universes/v1/places/${id}/universe`))
  )
  const map = {}
  results.forEach((r, i) => {
    if (r.status === 'fulfilled' && r.value?.universeId) {
      map[placeIds[i]] = r.value.universeId
    }
  })
  return map
}
// universeId -> visits, playing, name 
async function fetchGameDetails(universeIds) {
  const data = await get(
    `${R.games}/v1/games?universeIds=${universeIds.join(',')}`
  )
  const map = {}
  ;(data?.data ?? []).forEach(d => { map[String(d.id)] = d })
  return map
}

// two-phase fetch: thumbnails and universeIds run in parallel first
// then game details are fetched in one batch using the resolved universe ids
export async function loadGamesData(games) {
  const placeIds = games.map(g => g.placeId)
  const cached = readCache(placeIds)
  if (cached) return { games: cached, fromCache: true }
  const [thumbResult, univResult] = await Promise.allSettled([
    fetchThumbnails(placeIds),
    fetchUniverseIds(placeIds),
  ])
  const thumbMap = thumbResult.status === 'fulfilled' ? thumbResult.value : {}
  const univMap = univResult.status === 'fulfilled' ? univResult.value : {}
  const universeIds = Object.values(univMap).filter(Boolean)
  let detailMap = {}
  if (universeIds.length > 0) {
    try { detailMap = await fetchGameDetails(universeIds) } catch {}
  }
  const result = games.map(game => {
    const uid = univMap[game.placeId]
    const detail = uid ? detailMap[String(uid)] : null
    return {
      ...game,
      title: detail?.name ?? game.name,
      thumbnail: thumbMap[game.placeId] ?? null,
      visits: detail?.visits  ?? null,
      playing: detail?.playing ?? null,
      url: `https://www.roblox.com/games/${game.placeId}`,
    }
  })
  writeCache(result)
  return { games: result, fromCache: false }
}
