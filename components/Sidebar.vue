<template>
   <div class="w-1/6 bg-blue-100 min-h-screen">
        <h1 class="text-center font-bold text-xl my-7">PerpusModern</h1>
        <div class="px-3">
          <div class="">
            <p>Halo, <span class="font-bold">{{name}}</span></p>
            <p class="text-xs">{{tgl()}}</p>
          </div>
          <div class="flex flex-col my-5 divide-y">
            <span class="text-xs font-bold">DASHBOARD</span>
            <router-link to="/admin" exact-active-class="active">Dashboard</router-link>
          </div>
          <!-- Petugas -->
          <div v-show="role" class="flex flex-col my-5">
            <span class="text-xs font-bold">ADMIN</span>
            <router-link to="/admin/user" active-class="active">User</router-link>
            <router-link to="/admin/buku" active-class="active">Buku</router-link>
            <router-link to="/admin/history" active-class="active">History</router-link>
          </div>

          <div v-show="pc" class="flex flex-col my-5">
            <span class="text-xs font-bold uppercase">SUPERUSER</span>
            <router-link to="/pinjam">Pinjam Buku</router-link>
            <router-link to="/pengembalian">Pengembalian</router-link>
          </div>
          <!-- User -->

          <div class="flex flex-col my-5">
            <span class="text-xs font-bold">USER</span>
            <router-link to="/admin/keterangan" exact-active-class="active">Keterangan</router-link>
            <router-link to="/admin/setting" exact-active-class="active">Setting</router-link>
            <button @click="tryLogout" class="text-left">Logout</button>
          </div>
        </div>
      </div>
</template>

<script>
import moment from 'moment';
export default {
props:['name', 'role', 'pc'],
methods:{
  tgl(){
    return moment().format('LL')
  },
  tryLogout(){
    this.$swal.fire({
      icon: 'question',
      title: 'Ingin Logout?',
      showCancelButton: true,
      confirmButtonText: `Ya`
    }).then((result) => {
      if (result.isConfirmed) {
        this.$router.push('/logout')
      }
    })
  }
},
}
</script>

<style>
.active {
  color: #2563EB;
  font-weight: 700;
}
</style>