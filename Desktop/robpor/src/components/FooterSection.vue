<template>
  <footer class="site-footer">
    <div class="footer-line" />
    <div class="container footer__inner">
      <div class="footer__logo">
        <svg class="logo-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#7c3aed"/>
              <stop offset="100%" stop-color="#00d4ff"/>
            </linearGradient>
          </defs>
          <path d="M10 1L19 10L10 19L1 10Z" stroke="url(#footer-logo-grad)" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M10 6L14 10L10 14L6 10Z" fill="url(#footer-logo-grad)"/>
        </svg>
        <span><span class="gradient-text">GazinurZ</span></span>
      </div>
      <p class="footer__copy">
        Built with Vue 3 + SCSS by <a href="https://nageanima.xyz" target="_blank" rel="noopener noreferrer">nageanima.xyz</a> · Powered by Roblox API
      </p>
      <p class="footer__year">© {{ year }}</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  padding: 32px 0;

  .footer-line {
    height: 1px;
    background: linear-gradient(to right, transparent, $purple-primary, $cyan-primary, transparent);
    margin-bottom: 32px;
    opacity: 0.3;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: $font-heading;
    font-size: 0.9rem;
    font-weight: 700;

    .logo-icon {
      display: block;
      flex-shrink: 0;
    }
  }

  &__copy {
    font-size: 0.78rem;
    color: $text-muted;
  }

  &__year {
    font-size: 0.78rem;
    color: $text-muted;
  }
}
</style>
