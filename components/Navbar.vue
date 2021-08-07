<template>
  <div class="p-7 text-white border-b-2 border-gray-200">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-black hover:underline">PerpusModern</router-link>
      <div class="space-x-5" v-if="user.length == 0">
        <router-link to="/auth/login" class="hover:bg-blue-700 p-3 rounded text-blue-600 hover:text-white">Login</router-link>
        <router-link to="/auth/register" class="bg-blue-700 hover:bg-blue-800 p-3 rounded">Register</router-link>
      </div>
      <div class="space-x-5 flex items-center" v-else>
        <div class="text-lg">Selamat datang, <span class="font-medium">{{ (user.full_name == null) ? user.username : user.full_name }}</span></div>
        <router-link to="/admin" class="text-black hover:text-white hover:bg-blue-800 hover:font-bold px-4 py-2 rounded font-medium">Admin</router-link>
        <router-link to="/logout" class="bg-blue-800 px-4 py-2 rounded font-bold">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return {
    user: []
  }
},
created(){
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('user_perpus');
    if (local !== null) {
      const user = JSON.parse(local)
      this.user = user[0]
    }
  }
}
}
</script>

<style>

</style>