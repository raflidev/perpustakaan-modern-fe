<template>
  <div class="bg-blue-600 p-7 text-white flex justify-between items-center">
    <h1 class="text-2xl font-bold">PerpusModern</h1>
    <div class="space-x-5" v-if="user.length == 0">
      <router-link to="/auth/login" class="hover:bg-blue-700 p-3 rounded">Login</router-link>
      <router-link to="/auth/register" class="bg-blue-700 hover:bg-blue-800 p-3 rounded">Register</router-link>
    </div>
    <div class="space-x-5 flex items-center" v-else>
      <div class="text-lg">Selamat datang, <span class="font-medium">{{ (user.full_name == null) ? user.username : user.full_name }}</span></div>
      <router-link to="/admin" class="bg-blue-800 px-4 py-2 rounded font-bold">Admin</router-link>
      <router-link to="/logout" class="bg-blue-800 px-4 py-2 rounded font-bold">Logout</router-link>
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