interface IDataLogin {
  usernameOrEmail: string
  password: string
}

interface IResponseApi {
  success: boolean
  message: string
}

interface IState {
  loading: boolean
  responseApi: IResponseApi
}

export const useLoginStore = defineStore('loginStore', {
  state: (): IState => ({
    loading: false,
    responseApi: {
      success: false,
      message: '',
    },
  }),

  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },

    async login(data: IDataLogin) {
      this.setLoading(true)

      const helperStore = useHelperStore()
      const router = useRouter()

      helperStore.setNotify(false)
      helperStore.setOverlay(true, 'Login sedang diproses...')

      setTimeout(() => {
        if (data.usernameOrEmail === 'superadmin' && data.password === 'superadmin') {
          helperStore.setNotify(true, 'LOGIN BERHASIL', `Selamat datang ${data.usernameOrEmail}`, 'success')
          const authStore = useAuthStore()
          authStore.setAuth(true, 'superadmin', data.usernameOrEmail, 'token')
          router.push('/dashboard')
        } else {
          helperStore.setNotify(
            true,
            'LOGIN GAGAL!',
            'Akun anda tidak di temukan!. silahkan hungungi developer jika anda lupa akun!',
            'error'
          )
        }

        this.setLoading(false)
        helperStore.setOverlay(false)
      }, 5000)
    },
  },
})
