<template>
  <div>
      <div class="w-screen h-screen bg-gray-400">
          <div class="flex h-full justify-center items-center">
              <div class="w-1/3 min-h-0 bg-white rounded-md p-4">
                <div class="text-center">
                    <h1 class="font-bold text-2xl">Login</h1>
                    <p>Selamat datang, Silakan login terlebih dahulu</p>
                </div>
                <div v-if="notification != null" :class="{'bg-green-500': login}" class="text-center bg-red-500 p-2 rounded-md text-white my-3">
                  {{notification}}
                </div>
                <div class="my-5 space-y-4">
                  <div>
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" name="email" placeholder="email" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" name="password" placeholder="password" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                </div>
                  <button @click="Trylogin()" class="w-full bg-blue-400 rounded-md p-2 font-medium">Login</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
name:"login",
data(){
  return{
    email:null,
    password:null,
    login:false,
    notification:null,
  }
},
created(){
  const local = localStorage.getItem('user_perpus');
  if(local !== null) {
    this.$router.push('/');
  }
},
methods:{

  async Trylogin(){
    const data = await this.$axios.post("http://localhost:4000/api/login", {
      email: this.email,
      password: this.password
    })

    if (data.request.status === 200 && data.data.length > 0) {
      this.login = true
      this.notification = "berhasil login"
      this.$store.commit('addUser', data)
      localStorage.setItem("user_perpus", JSON.stringify(data.data))
      setTimeout(() => {
        this.$router.push('/');
      }, 2000);
    } else {
      this.login = false
      this.notification = "email atau password anda salah"
    }
  },
}
}
</script>

<style>

</style>