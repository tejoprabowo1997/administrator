<script lang="ts" setup>
const authStore = useAuthStore()

const role: ComputedRef<string | null> = computed(() => authStore.role)

const sideMenu = useState<boolean>('sideMenu')
sideMenu.value = true

const route = useRoute()

interface IListSideMenuUser {
  name: string
  route: string
  icon: string
  text: string
  role: string[]
}
const listSideMenuUser: IListSideMenuUser[] = [
  {
    name: 'dashboard',
    route: '/dashboard',
    icon: 'dashboard',
    text: 'Dashboard',
    role: ['superadmin', 'admin', 'vendor'],
  },
  {
    name: 'data_categories',
    route: '/data_categories',
    icon: 'category',
    text: 'Kategori',
    role: ['superadmin', 'admin'],
  },
  {
    name: 'vendors',
    route: '/vendors',
    icon: 'factory',
    text: 'Vendor',
    role: ['superadmin', 'admin'],
  },
  {
    name: 'data_products',
    route: '/data_products',
    icon: 'inventory',
    text: 'Data Produk',
    role: ['superadmin', 'admin', 'vendor'],
  },
  {
    name: 'locations',
    route: '/locations',
    icon: 'location_on',
    text: 'Lokasi',
    role: ['superadmin', 'admin'],
  },
  {
    name: 'order_product',
    route: '/order_product',
    icon: 'shopping_cart',
    text: 'Order Produk',
    role: ['superadmin', 'admin'],
  },
]
</script>

<template>
  <q-drawer show-if-above v-model="sideMenu" class="bg-blue-3" elevated>
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <q-list v-for="(menu, indexMenu) in listSideMenuUser" :key="indexMenu" separator>
          <q-item
            v-if="menu.role.includes(role || '')"
            clickable
            v-ripple
            :active="menu.name === route.name"
            :to="menu.route"
          >
            <q-item-section avatar>
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menu.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped></style>
