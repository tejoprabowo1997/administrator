export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  const isLogin: ComputedRef<boolean> = computed(() => authStore.isLogin)

  if (to.name !== 'index') {
    if (!isLogin.value) return '/'
  } else {
    if (isLogin.value) return '/dashboard'
  }
})
