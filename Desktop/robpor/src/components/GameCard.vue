<template>
  <a :href="game.url" target="_blank" rel="noopener noreferrer" class="game-card" :class="{ loaded: imgLoaded }">
    <div class="game-card__glow" />

    <div class="game-card__thumb">
      <img
        v-if="game.thumbnail"
        :src="game.thumbnail"
        :alt="game.title"
        @load="imgLoaded = true"
        @error="imgLoaded = true"
        class="game-card__img"
        :class="{ visible: imgLoaded }"
      />
      <div v-if="!game.thumbnail || !imgLoaded" class="game-card__placeholder">
        <svg class="placeholder-icon" width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="card-placeholder-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#7c3aed"/>
              <stop offset="100%" stop-color="#00d4ff"/>
            </linearGradient>
          </defs>
          <path d="M10 1L19 10L10 19L1 10Z" stroke="url(#card-placeholder-grad)" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M10 6L14 10L10 14L6 10Z" fill="url(#card-placeholder-grad)"/>
        </svg>
      </div>
      <div class="game-card__overlay">
        <span class="play-btn">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 6L1 11V1Z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
          </svg>
          Play
        </span>
      </div>
    </div>

    <div class="game-card__body">
      <h3 class="game-card__title">{{ game.title }}</h3>

      <div class="game-card__footer">
        <svg class="arrow" width="14" height="14" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="game-card__meta">
      <div v-if="game.visits !== null" class="meta-item">
        <span class="meta-icon">👁</span>
        <span>{{ formatNum(game.visits) }}</span>
      </div>
      <div v-if="game.playing !== null && game.playing > 0" class="meta-item meta-item--live">
        <span class="live-dot" />
        <span>{{ formatNum(game.playing) }} online</span>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ game: { type: Object, required: true } })

const imgLoaded = ref(false)

function formatNum(n) {
  if (n === null || n === undefined) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}
</script>

<style lang="scss" scoped>
.game-card {
  display: flex;
  flex-direction: column;
  border-radius: $radius-lg;
  background: $bg-card;
  border: 1px solid $border-subtle;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  animation: fade-up 0.5s ease both;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(124, 58, 237, 0.4);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px $purple-glow;

    .game-card__glow {
      opacity: 1;
    }

    .game-card__overlay {
      opacity: 1;
    }

    .game-card__img {
      transform: scale(1.05);
    }
  }

  &__glow {
    position: absolute;
    inset: -1px;
    border-radius: $radius-lg;
    background: $grad-purple-cyan;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &__thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: $bg-deep;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;

    &.visible {
      opacity: 1;
    }
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    @include flex-center;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(0, 212, 255, 0.08));

    .placeholder-icon {
      animation: pulse-glow 3s ease-in-out infinite;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    @include flex-center;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s ease;

    .play-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border: 2px solid $cyan-primary;
      border-radius: 50px;
      color: $cyan-primary;
      font-weight: 700;
      font-family: $font-heading;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      @include glow($cyan-primary, 10px);
    }
  }

  &__body {
    padding: 16px 18px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;

    @include respond(sm) {
      padding: 10px 12px 36px;
      gap: 6px;
    }
  }

  &__title {
    font-family: $font-heading;
    font-size: 0.82rem;
    font-weight: 700;
    color: $text-primary;
    line-height: 1.35;
    letter-spacing: 0.01em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @include respond(sm) {
      font-size: 0.72rem;
    }
  }

  &__meta {
    position: absolute;
    bottom: 12px;
    left: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.75rem;
      color: $text-muted;

      @include respond(sm) {
        font-size: 0.67rem;
        gap: 3px;
      }

      &--live {
        color: $green-neon;
      }

      .live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: $green-neon;
        box-shadow: 0 0 6px $green-neon;
        animation: pulse-glow 1.5s ease-in-out infinite;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: auto;

    .arrow {
      color: $text-muted;
      transition: color 0.2s, transform 0.2s;
    }
  }

  &:hover .arrow {
    color: $cyan-primary;
    transform: translate(2px, -2px);
  }
}
</style>
