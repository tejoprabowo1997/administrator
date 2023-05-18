<script lang="ts" setup>
const dataToEdit = useState<{
  _id: string
  name: string
  picName: string
  picPhone: string
  picEmail: string
}>('dataToEdit')

const helperStore = useHelperStore()
const vendorStore = useVendorStore()
const formEditVendor = useState<boolean>('formEditVendor')

const loading = computed(() => vendorStore.loading)
const responseApi = computed(() => vendorStore.responseApi)

const dataCategories = ['AUTOMOTIVE', 'GADGET', 'FOOD', 'TEKSTIL', 'ACCESSORIES']
const optionsCategories = ref(dataCategories)

const _id = ref<string | null>(dataToEdit.value._id)
const name = ref<string | null>(dataToEdit.value.name)
const categories = ref<string[] | []>([])
const picture = ref<File>()
const picName = ref<string | null>(dataToEdit.value.picName)
const picPhone = ref<string | null>(dataToEdit.value.picPhone)
const picEmail = ref<string | null>(dataToEdit.value.picEmail)

const createValueCategories = (val: any, done: any) => {
  if (val.length > 0) {
    if (!dataCategories.includes(val)) {
      dataCategories.push(val)
    }
    done(val, 'toggle')
  }
}
const filterFnCategories = (val: any, update: any) => {
  update(() => {
    if (val === '') {
      optionsCategories.value = dataCategories
    } else {
      const needle = val.toLowerCase()
      optionsCategories.value = dataCategories.filter((v) => v.toLowerCase().indexOf(needle) > -1)
    }
  })
}

watch(picPhone, (val) => {
  if (val) {
    const regex = /^\d+$/

    if (!regex.test(val)) picPhone.value = val.replace(/\D/g, '')
    if (/^08/.test(val) && val.length > 13) picPhone.value = val.slice(0, 13)
    if (/^02/.test(val) && val.length > 11) picPhone.value = val.slice(0, 11)
  }
})

const submit = async () => {
  if (!_id.value) return helperStore.setNotify(true, 'Validasi Error', 'ID vendor tidak ditemukan', 'error')
  if (!name.value) return helperStore.setNotify(true, 'Validasi Error', 'Nama vendor harus diisi', 'error')
  if (!picName.value) return helperStore.setNotify(true, 'Validasi Error', 'Nama PIC Vendor harus diisi', 'error')
  if (!picPhone.value) return helperStore.setNotify(true, 'Validasi Error', 'NO. Telpon PIC harus diisi', 'error')
  if (!picEmail.value) return helperStore.setNotify(true, 'Validasi Error', 'Email PIC harus diisi', 'error')

  if (!name.value.trim()) return helperStore.setNotify(true, 'Validasi Error', 'Nama vendor harus diisi', 'error')
  if (!picName.value.trim())
    return helperStore.setNotify(true, 'Validasi Error', 'Nama PIC Vendor harus diisi', 'error')
  if (!picPhone.value.trim())
    return helperStore.setNotify(true, 'Validasi Error', 'NO. Telpon PIC harus diisi', 'error')
  if (!picEmail.value.trim()) return helperStore.setNotify(true, 'Validasi Error', 'Email PIC harus diisi', 'error')

  await vendorStore.updateVendor({
    _id: _id.value,
    name: name.value,
    picName: picName.value,
    picPhone: picPhone.value,
    picEmail: picEmail.value,
  })

  if (responseApi.value.success) formEditVendor.value = false
}
</script>

<template>
  <div>
    <q-form @submit="submit">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-grey-7">Edit vendor {{ dataToEdit.name }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="name"
              label="Nama vendor"
              color="blue-6"
              outlined
              clearable
              :rules="[
                (val: string) => !!val || 'Nama vendor harus diisi',
                (val: string) => !!val.trim() || 'Nama vendor tidak boleh hanya berisi spasi',
              ]"
            />
          </q-card-section>
          <q-card-section class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-select
              v-model="categories"
              label="Pilih Kategori"
              outlined
              clearable
              multiple
              use-input
              use-chips
              input-debounce="0"
              disable
              @new-value="createValueCategories"
              :options="optionsCategories"
              @filter="filterFnCategories"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
              <template v-slot:label>
                <div class="text-red-4">Field kategori belum tersedia di database</div>
              </template>
            </q-select>
          </q-card-section>
        </q-card-section>

        <q-card-section horizontal>
          <q-card-section class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="picName"
              label="Nama PIC Vendor"
              color="blue-6"
              outlined
              clearable
              :rules="[
                (val: string) => !!val || 'Nama PIC Vendor harus diisi',
                (val: string) => !!val.trim() || 'Nama PIC Vendor tidak boleh hanya berisi spasi',
              ]"
            />
          </q-card-section>
          <q-card-section class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="picPhone"
              label="NO. Telpon PIC"
              color="blue-6"
              outlined
              clearable
              :rules="[
                (val) => (val && val.length > 0) || 'NO. Telpon PIC harus diisi',
                (val) =>
                  /^0[82]/.test(val) || 'NO. Telpon PIC harus dimulai dengan angka 0 dan karakter kedua harus 8 atau 2',
                (val) =>
                  /^02[1]|^08[1-9]/.test(val) ||
                  'No Telpon PIC tidak valid, silahkan cek kembali nomor yang anda masukkan',
                (val) => {
                  if (/^08/.test(val) && val.length < 11) {
                    return 'Panjang No Telpon PIC minimal 11 angka'
                  } else if (/^02/.test(val) && val.length !== 11) {
                    return 'Panjang No Telpon PIC harus 11 angka'
                  }
                  return true
                },
              ]"
            />
          </q-card-section>
        </q-card-section>

        <q-card-section horizontal>
          <q-card-section class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="picEmail"
              label="Email PIC"
              color="blue-6"
              outlined
              clearable
              :rules="[
                (val: string) => !!val || 'Email PIC harus diisi',
                (val: string) =>  !!val.trim() || 'Email PIC tidak boleh hanya berisi spasi',
                (val: string) => /.+@.+\..+/.test(val) || 'Format email tidak valid',
              ]"
            />
          </q-card-section>
          <q-card-section class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-file v-model="picture" label="Photo Vendor" color="blue-6" outlined disable clearable>
              <template v-slot:label>
                <div class="text-red-4">Field foto belum tersedia di database</div>
              </template>
            </q-file>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            label="Batal"
            flat
            color="grey-7"
            @click="
              () => {
                formEditVendor = false
              }
            "
          />
          <q-btn type="submit" label="Simpan perubahan" flat color="blue-6" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<style scoped></style>
