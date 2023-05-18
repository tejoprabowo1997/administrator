interface IResponseApi {
  success: boolean | undefined
  count: number
  pageLength: number
  message: string | null
  result: any
}

interface IDataVendors {
  _id: string
  name: string
  categories: string[]
  picture: string
  picName: string
  picPhone: string
  picEmail: string
  _createdDate: string
}

interface IDataCreateVendor {
  name: string
  categories: string[]
  picture: string
  picName: string
  picPhone: string
  picEmail: string
}

interface IDataUpdateVendor {
  _id: string
  name: string
  picName: string
  picPhone: string
  picEmail: string
}

interface IState {
  loading: boolean
  responseApi: IResponseApi
  dataVendors: IDataVendors[] | []
}

export const useVendorStore = defineStore('vendorStore', {
  state: (): IState => ({
    loading: false,
    responseApi: {
      success: undefined,
      count: 0,
      pageLength: 0,
      result: null,
      message: null,
    },
    dataVendors: [],
  }),

  actions: {
    async getAllVendor() {
      this.loading = true

      const helperStore = await useHelperStore()

      helperStore.setOverlay(true, 'Memuat data vendor...')

      const response = await useApi('/vendors/get', 'GET')
      this.dataVendors = response.result

      this.loading = false
      helperStore.setOverlay(false)
    },

    async createVendor(data: IDataCreateVendor) {
      this.loading = true

      const helperStore = await useHelperStore()

      helperStore.setOverlay(true, 'Menyimpan data vendor...')

      const response = await useApi('/vendors/create', 'POST', data)

      this.responseApi = response
      this.loading = false
      helperStore.setOverlay(false)

      if (!response.success) return helperStore.setNotify(true, 'Gagal', 'Data vendor gagal dibuat', 'error')

      helperStore.setNotify(true, 'Berhasil', 'Data vendor berhasil dibuat', 'success')
    },

    async updateVendor(data: IDataUpdateVendor) {
      this.loading = true

      const helperStore = await useHelperStore()

      helperStore.setOverlay(true, 'Menyimpan data vendor...')

      const response = await useApi('/vendors/update', 'PATCH', data)

      this.responseApi = response
      this.loading = false
      helperStore.setOverlay(false)

      if (!response.success) return helperStore.setNotify(true, 'Gagal', 'Data vendor gagal diubah', 'error')

      helperStore.setNotify(true, 'Berhasil', 'Data vendor berhasil diubah', 'success')
    },

    async deleteVendor(_id: string) {
      this.loading = true

      const helperStore = await useHelperStore()

      helperStore.setOverlay(true, 'Menghapus data vendor...')

      const response = await useApi('/vendors/remove', 'DELETE', null, { _id })

      this.responseApi = response
      this.loading = false
      helperStore.setOverlay(false)

      if (!response.success) return helperStore.setNotify(true, 'Gagal', 'Data vendor gagal dihapus', 'error')

      helperStore.setNotify(true, 'Berhasil', 'Data vendor berhasil dihapus', 'success')

      this.getAllVendor()
    },
  },
})
