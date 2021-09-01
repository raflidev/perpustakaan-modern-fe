<template>
<div class="w-0 lg:w-1/6 bg-blue-100">
    <div class="hidden lg:inline w-1/6 bg-blue-100 min-h-screen">
    <div class="w-full">
        <h1 class="text-center font-bold text-xl my-7">PerpusModern</h1>
        <div class="px-3">
          <div class="">
            <p>Halo, <span class="font-bold">{{user.full_name}}</span></p>
            <p class="text-xs">{{tgl()}}</p>
          </div>
          <div class="flex flex-col my-5 divide-y">
            <span class="text-xs font-bold">DASHBOARD</span>
            <router-link to="/admin" exact-active-class="active">Dashboard</router-link>
            <router-link to="/admin/user_history" exact-active-class="active">History</router-link>
          </div>
          <!-- Petugas -->
          <div v-show="user.role" class="flex flex-col my-5">
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
            <router-link to="/admin/setting" exact-active-class="active">Setting</router-link>
            <button @click="tryLogout" class="text-left">Logout</button>
          </div>
        </div>
    </div>
    </div>
    <div class="z-10 fixed bottom-0 p-5 lg:hidden w-full bg-blue-100 text-xs">
      <div class="flex justify-between w-full items-center">
        <div>
          <router-link to="/admin/" exact-active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </router-link>
        </div>
        <div>
          <router-link to="/admin/user_history" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>History</span>
          </router-link>
        </div>
        <div>
          <router-link to="/admin/setting" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Setting</span>
          </router-link>
        </div>
        <div>
          <router-link to="/logout" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </router-link>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
export default {
data(){
  return{
    user: [],
    pc: false,
  }
},
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
mounted(){
  const local = JSON.parse(localStorage.getItem('user_perpus'))
  this.pc = JSON.parse(localStorage.getItem('perpus_pc'))
  this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
    token: local
  }).then(dataToken => {
      this.user = dataToken.data.user
  }).catch(() => {
    localStorage.removeItem('user_perpus')
    this.$router.push('/auth/login')
  })
}
}
</script>

<style>
.active {
  color: #2563EB;
  font-weight: 700;
}
</style>