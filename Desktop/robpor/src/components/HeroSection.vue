<template>
  <section class="hero">
    <div class="hero__particles">
      <span v-for="n in 8" :key="n" class="particle" :style="particleStyle(n)" />
    </div>

    <div class="hero__orb hero__orb--left" />
    <div class="hero__orb hero__orb--right" />

    <div class="container hero__content">

      <h1 class="hero__title">
         <span class="gradient-text">GazinurZ</span><br />
        Game Studio
      </h1>

      <p class="hero__sub">
        {{ gamesCount }} games built and published on the Roblox platform.<br />
        Explore the full catalog below.
      </p>

      <div class="hero__stats">
        <div class="stat">
          <span class="stat__value gradient-text">{{ gamesCount }}</span>
          <span class="stat__label">Games</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat__value gradient-text">{{ formatNum(totalOnline) }}</span>
          <span class="stat__label">Online</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat__value gradient-text">{{ formatNum(totalVisits) }}</span>
          <span class="stat__label">Visits</span>
        </div>
      </div>

      <a href="#games" class="hero__cta">
        <span>Explore Games</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <div class="hero__scroll-hint">
      <div class="scroll-line" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  gamesCount:   { type: Number, default: 0 },
  totalOnline:  { type: Number, default: 0 },
  totalVisits:  { type: Number, default: 0 },
})

function formatNum(n) {
  if (!n) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

function particleStyle(n) {
  const seed = n * 137.508
  return {
    left: `${(seed % 100)}%`,
    top: `${((seed * 1.618) % 100)}%`,
    width: `${2 + (n % 3)}px`,
    height: `${2 + (n % 3)}px`,
    animationDelay: `${(n * 0.4) % 6}s`,
    animationDuration: `${4 + (n % 4)}s`,
    opacity: 0.3 + (n % 4) * 0.15,
  }
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px 0 80px;

  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--left {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%);
      top: -100px;
      left: -150px;
      animation: float 8s ease-in-out infinite;
    }

    &--right {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
      bottom: 0;
      right: -100px;
      animation: float 10s ease-in-out infinite reverse;
    }

  }

  &__particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
    animation: fade-up 0.8s ease both;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border: 1px solid rgba(124, 58, 237, 0.4);
    border-radius: 50px;
    background: rgba(124, 58, 237, 0.08);
    font-size: 0.78rem;
    font-weight: 600;
    color: $purple-light;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 28px;

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $green-neon;
      box-shadow: 0 0 8px $green-neon;
      animation: pulse-glow 2s ease-in-out infinite;
    }
  }

  &__title {
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 900;
    line-height: 1.05;
    color: $text-primary;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  &__sub {
    font-size: 1.05rem;
    color: $text-secondary;
    line-height: 1.7;
    max-width: 520px;
    margin: 0 auto 48px;
  }

  &__stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    margin-bottom: 52px;

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      &__value {
        font-family: $font-heading;
        font-size: 2rem;
        font-weight: 700;
      }

      &__label {
        font-size: 0.78rem;
        color: $text-muted;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: $border-subtle;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: $grad-purple-cyan;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.95rem;
    color: white;
    letter-spacing: 0.04em;
    transition: all 0.3s ease;
    box-shadow: 0 0 30px $purple-glow;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 40px $purple-glow, 0 0 60px rgba(0, 212, 255, 0.2);
    }

    svg {
      transition: transform 0.2s;
    }

    &:hover svg {
      transform: translateX(4px);
    }
  }

  &__scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);

    .scroll-line {
      width: 1px;
      height: 60px;
      background: linear-gradient(to bottom, $purple-primary, transparent);
      animation: pulse-glow 2s ease-in-out infinite;
    }
  }
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: $purple-light;
  animation: particle-drift linear infinite;
  pointer-events: none;
}
</style>
