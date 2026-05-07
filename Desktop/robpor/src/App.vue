<template>
  <div class="app" :class="{ 'animations-paused': paused }">
    <NavBar />
    <HeroSection :games-count="games.length" :total-online="totalOnline" :total-visits="totalVisits" />
    <GamesGrid :games="games" :loading="loading" :load-error="loadError" :from-cache="fromCache" />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import GamesGrid from './components/GamesGrid.vue'
import FooterSection from './components/FooterSection.vue'
import GAMES from './config/games.json'
import { loadGamesData } from './services/roblox.js'

const loading = ref(true)
const loadError = ref(false)
const fromCache = ref(false)
const games = ref([])
const paused = ref(false)

// pause CSS animations while the tab is backgrounded to save CPU
const onVisibility = () => { paused.value = document.hidden }
onMounted(() => document.addEventListener('visibilitychange', onVisibility))
onUnmounted(() => document.removeEventListener('visibilitychange', onVisibility))

const totalOnline = computed(() =>
  games.value.reduce((sum, g) => sum + (g.playing ?? 0), 0)
)
const totalVisits = computed(() =>
  games.value.reduce((sum, g) => sum + (g.visits ?? 0), 0)
)

onMounted(async () => {
  games.value = GAMES.map(g => ({
    ...g,
    title: g.name,
    thumbnail: null,
    visits: null,
    playing: null,
    url: `https://www.roblox.com/games/${g.placeId}`,
  }))

  try {
    const { games: enriched, fromCache: cached } = await loadGamesData(GAMES)
    games.value = enriched
    fromCache.value = cached
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss">
.app {
  min-height: 100vh;
}

.animations-paused * {
  animation-play-state: paused !important;
}
</style>
