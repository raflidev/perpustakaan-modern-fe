<template>
   <div class="w-1/6 bg-blue-100 h-screen">
        <h1 class="text-center font-bold text-xl my-7">PerpusModern</h1>
        <div class="px-3">
          <div class="flex flex-col my-5 divide-y">
            <span class="text-xs font-bold">DASHBOARD</span>
            <router-link to="/admin" exact-active-class="active">Dashboard</router-link>
          </div>
          <!-- Petugas -->
          <div v-show="user.role" class="flex flex-col my-5">
            <span class="text-xs font-bold">ADMIN</span>
            <router-link to="/admin/user" exact-active-class="active">User</router-link>
            <router-link to="/admin/pinjam" exact-active-class="active">Pinjam Buku</router-link>
            <router-link to="/admin/pengembalian" exact-active-class="active">Pengembalian</router-link>
          </div>
          <!-- User -->

          <div class="flex flex-col my-5">
            <span class="text-xs font-bold">USER</span>
            <router-link to="/admin/setting">Setting</router-link>
            <router-link to="/logout">Logout</router-link>
          </div>
        </div>
      </div>
</template>

<script>
export default {
data(){
    return {
        user: {}
    }
},
async created() {
    if(typeof window !== 'undefined'){
    const local = localStorage.getItem('user_perpus');
    if(local !== null) {
      const data = JSON.parse(local)
      this.user = data[0];
    }
  } 
  }
}
</script>

<style>
.active {
  color: #2563EB;
  font-weight: 700;
}
</style>