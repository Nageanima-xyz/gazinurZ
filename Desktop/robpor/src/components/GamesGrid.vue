<template>
  <section id="games" class="games-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Collection</span>
        <h2 class="section-title">
          All <span class="gradient-text">Games</span>
        </h2>
        <p class="section-sub">Click any game to open it on Roblox</p>
      </div>

      <div class="filter-bar">
        <input
          v-model="search"
          type="text"
          placeholder="Search games..."
          class="search-input"
        />
        <div class="status-pill" :class="statusClass">
          <span class="status-dot" />
          {{ statusLabel }}
        </div>
      </div>

      <LoadingSpinner v-if="loading" />

      <template v-else>
        <div v-if="filtered.length" class="games-grid">
          <GameCard
            v-for="(game, i) in filtered"
            :key="game.placeId"
            :game="game"
            :style="{ animationDelay: `${i * 0.06}s` }"
          />
        </div>
        <div v-else class="empty-state">
          <svg class="empty-icon" width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grid-empty-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#7c3aed"/>
                <stop offset="100%" stop-color="#00d4ff"/>
              </linearGradient>
            </defs>
            <path d="M10 1L19 10L10 19L1 10Z" stroke="url(#grid-empty-grad)" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M10 6L14 10L10 14L6 10Z" fill="url(#grid-empty-grad)"/>
          </svg>
          <p>No games match your search</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import GameCard from './GameCard.vue'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  games: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  loadError: { type: Boolean, default: false },
  fromCache: { type: Boolean, default: false },
})

const search = ref('')

function sortByOnline(list) {
  return [...list].sort((a, b) => (b.playing ?? 0) - (a.playing ?? 0))
}

const filtered = computed(() => {
  const list = search.value.trim()
    ? props.games.filter(g =>
        g.title.toLowerCase().includes(search.value.toLowerCase())
      )
    : props.games
  return sortByOnline(list)
})

const statusClass = computed(() => {
  if (props.loading) return 'status--loading'
  if (props.loadError) return 'status--error'
  return 'status--ok'
})

const statusLabel = computed(() => {
  if (props.loading) return 'Fetching from Roblox...'
  if (props.loadError) return 'API unavailable — showing static data'
  if (props.fromCache) return `${props.games.length} games · cached`
  return `${props.games.length} games loaded`
})
</script>

<style lang="scss" scoped>
.games-section {
  padding: 80px 0 120px;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;

  .section-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: $purple-light;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.3);
    padding: 4px 14px;
    border-radius: 50px;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 900;
    color: $text-primary;
    margin-bottom: 12px;
  }

  .section-sub {
    color: $text-muted;
    font-size: 0.9rem;
  }
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @include respond(sm) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 24px;

    .status-pill {
      align-self: flex-start;
    }
  }

  .search-input {
    flex: 1;
    min-width: 200px;
    padding: 12px 20px;
    background: rgba(13, 13, 31, 0.8);
    border: 1px solid $border-subtle;
    border-radius: 50px;
    color: $text-primary;
    font-family: $font-body;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder { color: $text-muted; }

    &:focus {
      border-color: rgba(124, 58, 237, 0.5);
      box-shadow: 0 0 0 3px $purple-glow;
    }
  }

  .status-pill {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.78rem;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid $border-subtle;

    &--ok {
      color: $green-neon;
      background: rgba(16, 217, 160, 0.07);
      border-color: rgba(16, 217, 160, 0.25);

      .status-dot { background: $green-neon; box-shadow: 0 0 6px $green-neon; }
    }
    &--loading {
      color: $cyan-primary;
      background: rgba(0, 212, 255, 0.07);
      border-color: rgba(0, 212, 255, 0.25);

      .status-dot { background: $cyan-primary; animation: pulse-glow 1s ease-in-out infinite; }
    }
    &--error {
      color: #f97316;
      background: rgba(249, 115, 22, 0.07);
      border-color: rgba(249, 115, 22, 0.25);

      .status-dot { background: #f97316; }
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;

  @include respond(md) {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @include respond(sm) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.empty-state {
  @include flex-center;
  flex-direction: column;
  gap: 16px;
  padding: 80px 0;
  color: $text-muted;

  .empty-icon {
    opacity: 0.4;
  }

  p {
    font-size: 0.9rem;
  }
}
</style>
