<template>
  <div>
      <div class="w-screen h-screen bg-gray-400">
          <div class="flex h-full justify-center items-center">
              <div class="w-1/3 min-h-0 bg-white rounded-md p-4">
                <div class="text-center">
                    <h1 class="font-bold text-2xl">Login</h1>
                    <p>Selamat datang, Silakan login terlebih dahulu</p>
                </div>
                <div v-if="notification != null" class="text-center bg-red-500 p-2 rounded-md text-white my-3">
                  {{notification}}
                </div>
                <div class="my-5 space-y-4">
                  <div>
                    <label for="email">Email</label>
                    <input v-model="email" type="email" name="email" placeholder="email" id="" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input v-model="password" type="password" name="password" placeholder="password" id="" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                </div>
                  <button @click="Trylogin()" class="w-full bg-blue-400 rounded-md p-2 font-medium">Login</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
name:"login",
data(){
  return{
    email:null,
    password:null,
    login:false,
    notification:null,
    dataUser: null
  }
},
 computed: {
    user () {
      return this.$store.state.user
    }
  },
methods:{

  async Trylogin(){
    const data = await this.$axios.$get("http://localhost:4000/api/user")
    data.map((data) => {
      if(data.email == this.email && data.password == this.password){
        this.login = true
        this.notification = null
        this.$store.commit('addUser', data)
        // this.dataUser = data
      }else{
        this.notification = "email atau password anda salah"
      }
    })
  }
}
}
</script>

<style>

</style>