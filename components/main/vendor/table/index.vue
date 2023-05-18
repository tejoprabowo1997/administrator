<script lang="ts" setup>
const $q = useQuasar()
const formAddVendor = useState<boolean>('formAddVendor')
const formEditVendor = useState<boolean>('formEditVendor')
const actionBtn = ref<boolean>(false)
const search = ref<string | null>(null)
const vendorStore = useVendorStore()

await vendorStore.getAllVendor()

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
const dataVendors: ComputedRef<IDataVendors[]> = computed(() => vendorStore.dataVendors)

interface IColumns {
  name: string
  required?: boolean
  label: string
  align?: 'left' | 'center' | 'right'
  field: string | ((row: any) => any)
  format?: (val: any) => string
  sortable?: boolean
  sort?: (a: any, b: any) => number
}
const columns: IColumns[] = [
  {
    name: 'name',
    required: true,
    label: 'Nama Vendor',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'categories',
    required: true,
    label: 'Kategori',
    align: 'left',
    field: (row) => row.categories,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'picture',
    required: true,
    label: 'Foto',
    align: 'left',
    field: (row) => row.picture,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'picName',
    required: true,
    label: 'Nama PIC',
    align: 'left',
    field: (row) => row.picName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'picPhone',
    required: true,
    label: 'No. HP PIC',
    align: 'left',
    field: (row) => row.picPhone,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'picEmail',
    required: true,
    label: 'Email PIC',
    align: 'left',
    field: (row) => row.picEmail,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: '_createdDate',
    required: true,
    label: 'Tanggal Dibuat',
    align: 'left',
    field: (row) => row._createdDate,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: '_id',
    required: true,
    label: 'Aksi',
    align: 'center',
    field: (row) => row._id,
    format: (val) => `${val}`,
    sortable: false,
  },
]
const initialPagination = {
  page: 1,
  rowsPerPage: 8,
}

const dataToEdit = useState<{
  _id: string
  name: string
  picName: string
  picPhone: string
  picEmail: string
}>('dataToEdit')
</script>

<template>
  <q-table
    title="Data Vendor"
    :rows="dataVendors"
    :columns="columns"
    row-key="_id"
    :pagination="initialPagination"
    :filter="search"
    grid
    class="q-pb-lg q-mb-lg"
  >
    <template v-slot:top-right>
      <!-- <q-btn
        class="q-mr-md"
        color="red"
        dense
        flat
        @click="
          () => {
            $q.dialog({
              title: 'Konfirmasi hapus semua vendor!',
              message: `Apakah anda yakin menghapus semua vendor? ini akan memakan waktu yg cukup lama tergantung kecepatan internet anda!`,
              persistent: true,
              cancel: true,
            })
              .onOk(async () => {
                // await vendorStore.deleteAllDataVendor()
              })
              .onCancel(() => {})
          }
        "
      >
        Hapus semua data vendor
      </q-btn>
      <q-btn
        class="q-mr-md"
        color="orange"
        dense
        flat
        @click="
          () => {
            $q.dialog({
              title: 'Konfirmasi dummy vendor!',
              message: `Apakah anda yakin membuat 100 data dummy vendor? ini akan memakan waktu yg cukup lama tergantung kecepatan internet anda!`,
              persistent: true,
              cancel: true,
            })
              .onOk(async () => {
                // await vendorStore.createDummyVendors()
              })
              .onCancel(() => {})
          }
        "
      >
        Buat 100 data dummy vendor
      </q-btn>
      <q-btn
        icon="add"
        round
        flat
        color="blue-6"
        @click="
          () => {
            formAddVendor = true
          }
        "
      /> -->
      <q-input v-model="search" label="Pencarian" dense outlined clearable>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card flat>
          <q-card-section>
            Nama Vendor
            <br />
            <strong>{{ props.row.name }}</strong>
          </q-card-section>
          <q-separator />

          <q-card-section>
            Kategori
            <br />
            <strong class="text-red-3">{{ props.row.categories || 'Field belum ada di database' }}</strong>
          </q-card-section>
          <q-separator />

          <q-card-section>
            Foto
            <br />
            <strong class="text-red-3">{{ props.row.picture || 'Field belum ada di database' }}</strong>
          </q-card-section>
          <q-separator />

          <q-card-section>
            Nama PIC
            <br />
            <strong>{{ props.row.picName }}</strong>
          </q-card-section>
          <q-separator />

          <q-card-section>
            No. HP PIC
            <br />
            <strong>{{ props.row.picPhone }}</strong>
          </q-card-section>
          <q-separator />

          <q-card-section>
            Email PIC
            <br />
            <strong>{{ props.row.picEmail }}</strong>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right">
            <q-btn
              dense
              outline
              color="orange"
              label="edit"
              @click="
                () => {
                  formEditVendor = true
                  dataToEdit = {
                    _id: props.row._id,
                    name: props.row.name,
                    picName: props.row.picName,
                    picPhone: props.row.picPhone,
                    picEmail: props.row.picEmail,
                  }
                }
              "
            />
            <q-btn
              dense
              outline
              color="red"
              label="hapus"
              @click="
                () => {
                  $q.dialog({
                    title: `<div class='text-red-4 text-center'>Konfirmasi hapus vendor!</div>`,
                    message: `<div class='text-center text-grey-10'>Apakah anda yakin menghapus vendor ${props.row.name}?</div>`,
                    persistent: true,
                    cancel: true,
                    html: true,
                    position: 'top',
                  })
                    .onOk(async () => {
                      await vendorStore.deleteVendor(props.row._id)
                    })
                    .onCancel(() => {})
                }
              "
            />
          </q-card-actions>
        </q-card>
      </div>
    </template>
  </q-table>

  <div class="q-mt-md">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        v-model="actionBtn"
        label="Pengaturan"
        vertical-actions-align="right"
        color="orange-10"
        icon="settings"
        direction="up"
      >
        <q-fab-action
          color="primary"
          icon="add"
          label="Tambah vendor baru"
          @click="
            () => {
              formAddVendor = true
            }
          "
        />
        <q-fab-action color="green-8" icon="note_add" label="100 data random" />
        <q-fab-action color="red-4" icon="delete" label="Kosongkan data" />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<style scoped></style>
