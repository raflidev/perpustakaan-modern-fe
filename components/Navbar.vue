<template>
  <div class="bg-blue-600 p-7 text-white flex justify-between items-center">
    <h1 class="text-2xl font-bold">PerpusModern</h1>
    <div class="space-x-5" v-if="user == null">
    <router-link to="/auth/login" class="hover:bg-blue-700 p-3 rounded">Login</router-link>
    <router-link to="/auth/register" class="bg-blue-700 hover:bg-blue-800 p-3 rounded">Register</router-link>
    </div>
    <div class="space-x-5 flex items-center" v-else>
      <div class="text-lg">Selamat datang, <span class="font-medium">{{ (user.fullname == null) ? user.username : user.fullname }}</span></div>
      <router-link to="/admin" class="bg-blue-800 px-4 py-2 rounded font-bold">Admin</router-link>
      <button class="bg-blue-800 px-4 py-2 rounded font-bold">Logout</button>
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
created(){
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('user_perpus');
    this.user = JSON.parse(local)[0]
  }
}
}
</script>

<style>

</style>