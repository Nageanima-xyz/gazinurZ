<template>
  <div class="loader">
    <div class="loader__ring" />
    <div class="loader__ring loader__ring--inner" />
    <span class="loader__text">Loading games...</span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  @include flex-center;
  flex-direction: column;
  gap: 20px;
  padding: 80px 0;
  position: relative;

  &__ring {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: $purple-primary;
    animation: spin-slow 1.2s linear infinite;

    &--inner {
      width: 42px;
      height: 42px;
      border-top-color: $cyan-primary;
      animation-duration: 0.8s;
      animation-direction: reverse;
    }
  }

  &__text {
    margin-top: 50px;
    font-family: $font-heading;
    font-size: 0.8rem;
    color: $text-muted;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    animation: pulse-glow 2s ease-in-out infinite;
  }
}
</style>
