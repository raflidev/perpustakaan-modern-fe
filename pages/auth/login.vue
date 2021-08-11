<template>
  <div>
      <Navbar/>
      <div class="min-h-screen mt-10">
          <div class="flex h-full justify-center items-center">
              <div class="w-1/3 min-h-0 bg-white rounded-md p-4 border border-black">
                <div class="text-center">
                    <h1 class="font-bold text-2xl">Login</h1>
                    <p>Selamat datang, Silakan login terlebih dahulu</p>
                </div>
                <div v-if="notification != null" :class="{'bg-green-500': login}" class="text-center bg-red-500 p-2 rounded-md text-white my-3">
                  {{notification}}
                </div>
                <form class="my-5 space-y-4" @submit.prevent="Trylogin">
                  <div>
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" name="email" placeholder="email" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifEmail">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Email tidak valid
                      </span>
                    </div>
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" name="password" placeholder="password" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <button type="submit" class="w-full bg-blue-400 rounded-md p-2 font-medium text-white">Login</button>
                  <p class="mt-3">Belum punya akun? <router-link class="text-blue-700" to="/auth/register">Register</router-link> </p>
                </form>
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
    notifEmail: false
  }
},
created(){
  if(typeof window !== 'undefined'){
    const local = localStorage.getItem('user_perpus');
    if(local !== null) {
      this.$router.push('/');
    }
  }
},
methods:{

  async Trylogin(){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email)) {
        const data = await this.$axios.post("http://localhost:4000/api/login", {
          email: this.email,
          password: this.password
        })
        console.log(data);
        if (data.request.status === 200 && data.data.length > 0) {
          this.login = true
          this.$swal.fire('Anda Berhasil Login', '', 'success')
          this.notification = "berhasil login"
          this.$store.commit('addUser', data)
          localStorage.setItem("user_perpus", JSON.stringify(data.data))
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        } else if (data.request.status === 500) {
          this.login = false
          this.$swal.fire('Server error 500', 'ada kesalahan server, mohon tunggu beberapa saat', 'error')
          this.notification = "server error 500"
        } else {
          this.login = false
          this.$swal.fire('Email Atau Password Anda Salah', '', 'error')
          this.notification = "email atau password anda salah"
        }
      } else {
        this.notifEmail = true;
        setTimeout(() => {
          this.notifEmail = false;
        }, 4000);
      }
    }
},
created(){
  if(typeof window !== 'undefined'){
      const local = JSON.parse(localStorage.getItem('user_perpus'))
      if (!local[0].role) {
        this.$swal.fire('Tidak punya hak', 'anda bukan admin', 'error');
        this.$router.push('/admin')
      }
    }
}
}
</script>

<style>

</style>