interface IState {
  isLogin: boolean
  role: string | null
  username: string | null
  token: string | null
}

export const useAuthStore = defineStore('authStore', {
  persist: true,

  state: (): IState => ({
    isLogin: false,
    role: '',
    username: '',
    token: '',
  }),

  actions: {
    setAuth(isLogin: boolean, role: string | null = null, username: string | null = null, token: string | null = null) {
      this.isLogin = isLogin
      this.role = role
      this.username = username
      this.token = token
    },
  },
})
