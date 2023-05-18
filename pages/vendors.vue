<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})

const formAddVendor = useState<boolean>('formAddVendor')
const formEditVendor = useState<boolean>('formEditVendor')
</script>

<template>
  <div>
    <Transition name="page">
      <MainVendorTable v-if="!formAddVendor && !formEditVendor" />
      <MainVendorFormAdd v-else-if="formAddVendor" />
      <MainVendorFormEdit v-else="formEditVendor" />
    </Transition>
  </div>
</template>

<style scoped></style>
