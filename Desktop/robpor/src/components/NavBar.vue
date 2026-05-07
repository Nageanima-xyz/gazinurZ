<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar__inner">
      <div class="navbar__logo">
        <svg class="logo-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#7c3aed"/>
              <stop offset="100%" stop-color="#00d4ff"/>
            </linearGradient>
          </defs>
          <path d="M10 1L19 10L10 19L1 10Z" stroke="url(#nav-logo-grad)" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M10 6L14 10L10 14L6 10Z" fill="url(#nav-logo-grad)"/>
        </svg>
        <span class="logo-text"><span class="gradient-text">GazinurZ</span></span>
      </div>
      <div class="navbar__links">
        <a href="#games">Games</a>
        <a href="#about">About</a>
        <a href="https://www.instagram.com/gaz1inur" target="_blank" class="btn-connect">
          <span>Contact me</span>
          <svg class="btn-arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const onScroll = () => { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(8, 8, 18, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 14px 0;
    border-bottom: 1px solid $border-subtle;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-heading;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: default;

    .logo-icon {
      display: block;
      flex-shrink: 0;
      animation: pulse-glow 3s ease-in-out infinite;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 32px;

    a {
      color: $text-secondary;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.2s;
      letter-spacing: 0.05em;

      &:hover { color: $text-primary; }
    }

    @include respond(md) {
      gap: 0;

      a:not(.btn-connect) {
        display: none;
      }
    }
  }

  .btn-connect {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border: 1px solid $border-glow;
    border-radius: 50px;
    background: rgba(124, 58, 237, 0.1);
    color: $purple-light !important;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(124, 58, 237, 0.25);
      box-shadow: 0 0 20px $purple-glow;
      transform: translateY(-1px);
    }

    .btn-arrow {
      display: flex;
      align-items: center;
    }
  }
}
</style>
