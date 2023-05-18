<template>
  <NuxtLayout>
    <NuxtLoadingIndicator class="bg-white" :height="4" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-50%);
}
.layout-enter-to,
.layout-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0%);
}
/* =========================================================================================== */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0%);
}
/* =========================================================================================== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-enter-active {
  animation: fade-in 0.5s;
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fade-leave-active {
  animation: fade-out 0.5s;
}
</style>
