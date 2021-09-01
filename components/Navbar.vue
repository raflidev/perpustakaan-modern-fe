<template>
  <div class="py-7 px-5 border-b-2 border-gray-200 fixed top-0 bg-white w-full z-10">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-black hover:underline">PerpusModern</router-link>
      <div v-if="$route.name == 'index'" class="hidden lg:inline">
        <a href="#home" class="px-4 py-2 hover:text-blue-500" v-scroll-to="{ el: '#home', offset: -200 }">Home</a>
        <a href="#feature" class="px-4 py-2 hover:text-blue-500" v-scroll-to="{ el: '#feature', offset: -100, duration: 2000 }">Features</a>
        <a href="#fasttrack" class="px-4 py-2 hover:text-blue-500" v-scroll-to="{ el: '#fasttrack', offset: -100 }">Fast Track</a>
      </div>
      <div class="space-x-5" v-if="user.length == 0">
        <router-link to="/auth/login" class="hover:bg-blue-700 p-3 rounded text-blue-600 hover:text-white">Login</router-link>
        <router-link to="/auth/register" class="hidden lg:inline bg-blue-700 hover:bg-blue-800 p-3 rounded text-white">Register</router-link>
      </div>
      <div class="space-x-5 flex items-center" v-else>
        <router-link to="/admin" class="bg-blue-700 lg:bg-white text-white lg:text-black hover:text-white hover:bg-blue-800 hover:font-bold px-4 py-2 rounded font-medium">Admin</router-link>
        <router-link to="/logout" class="hidden lg:inline bg-blue-800 px-4 py-2 rounded font-bold text-white">Logout</router-link>
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