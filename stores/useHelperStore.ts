interface IConfig {
  baseUrlApi: string
}

interface IOverlay {
  show: boolean
  message: string | null
}

interface INotify {
  show: boolean
  title: string | null
  message: string | null
  type: 'success' | 'error' | 'warning' | 'info' | 'default' | null
}

interface IAlert {
  show: boolean
  title: string | null
  message: string | null
  type: 'success' | 'error' | 'warning' | 'info' | 'default' | null
}

interface IState {
  config: IConfig
  overlay: IOverlay
  notify: INotify
  alert: IAlert
}

export const useHelperStore = defineStore('helperStore', {
  state: (): IState => ({
    config: {
      baseUrlApi: 'https://us-central1-hayodagang.cloudfunctions.net/hayodagang_v1',
    },
    overlay: {
      show: false,
      message: null,
    },
    notify: {
      show: false,
      title: null,
      message: null,
      type: 'default',
    },
    alert: {
      show: false,
      title: '',
      message: '',
      type: 'default',
    },
  }),

  actions: {
    setOverlay(show: boolean, message: string | null = null) {
      this.overlay.show = show
      this.overlay.message = message
    },

    setNotify(
      show: boolean,
      title: string | null = null,
      message: string | null = null,
      type: 'success' | 'error' | 'warning' | 'info' | 'default' | null = null
    ) {
      this.notify.show = show
      this.notify.title = title
      this.notify.message = message
      this.notify.type = type
    },

    setAlert(
      show: boolean,
      title: string | null = null,
      message: string | null = null,
      type: 'success' | 'error' | 'warning' | 'info' | 'default' | null = null
    ) {
      this.alert.show = show
      this.alert.title = title
      this.alert.message = message
      this.alert.type = type
    },
  },
})
