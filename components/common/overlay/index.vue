<script lang="ts" setup>
import { QSpinnerGears } from 'quasar'

const $q = useQuasar()
const helperStore = useHelperStore()

interface IOverlay {
  show: boolean
  message: string | null
}
const overlay: ComputedRef<IOverlay> = computed(() => helperStore.overlay)

watch(
  overlay,
  (value) => {
    if (value.show) {
      $q.loading.show({
        message: value.message || 'Loading...',
        spinnerSize: 100,
        spinnerColor: 'blue-6',
        spinner: QSpinnerGears,
        messageColor: 'blue-6',
        backgroundColor: 'white',
        customClass: 'q-pa-md',
      })
    } else {
      $q.loading.hide()
    }
  },
  { deep: true }
)
</script>

<template></template>

<style scoped></style>
