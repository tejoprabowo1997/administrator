<script lang="ts" setup>
const loginStore = useLoginStore()
const helperStore = useHelperStore()

const usernameOrEmail = ref<string>()
const password = ref<string>()

const showPassword = ref<boolean>(false)
const loading: ComputedRef<boolean> = computed<boolean>(() => loginStore.loading)

const submit = async () => {
  if (!usernameOrEmail.value) return helperStore.setNotify(true, 'Username atau Email harus diisi', 'error')
  if (!password.value) return helperStore.setNotify(true, 'Password harus diisi', 'error')

  if (!usernameOrEmail.value.trim())
    return helperStore.setNotify(true, 'Username atau Email tidak boleh spasi', 'error')
  if (!password.value.trim()) return helperStore.setNotify(true, 'Password tidak boleh spasi', 'error')

  loginStore.login({
    usernameOrEmail: usernameOrEmail.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="row items-center justify-center q-pa-sm bg-blue-1" style="height: 100vh">
    <CommonAlert />
    <div class="col-lg-4 col-md-5 col-sm-6 col-xs-12">
      <q-form @submit.prevent="submit">
        <q-card>
          <q-card-section class="bg-blue-6 text-white text-center">
            <div class="text-h6">Masuk HayoDagang Panel</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="usernameOrEmail"
              label="Username atau Email"
              color="blue-6"
              outlined
              autofocus
              :rules="[(val: string) => (val && val.length > 0) || 'Username atau Email harus diisi']"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="password"
              label="Password"
              color="blue-6"
              :type="showPassword ? 'text' : 'password'"
              outlined
              :rules="[(val: string) => (val && val.length > 0) || 'Password harus diisi']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-separator />

          <q-card-actions class="justify-center">
            <q-btn label="Masuk" type="submit" color="blue-6" style="width: 50%" :loading="loading" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<style scoped></style>
