<template>
  <div>
      <Navbar/>
      <div class="min-h-screen mt-40">
          <div class="flex h-full justify-center items-center px-5 lg:px-0">
              <div class="w-full lg:w-1/3 min-h-0 bg-white rounded-md p-4 border border-black">
                <div class="text-center">
                    <h1 class="font-bold text-2xl">Login</h1>
                    <p>Selamat datang, Silakan login terlebih dahulu</p>
                    <div class="flex-row text-sm">
                      <div class="flex justify-center space-x-2">
                        <p>
                          demo admin:   
                        </p>
                        <div>
                          demo@demo.com | demo
                        </div>
                      </div>
                      <div class="flex justify-center space-x-2">
                        <p>
                          demo user:
                        </p>
                        <div>
                          user@demo.com | user
                        </div>
                      </div>
                    </div>
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
                <button type="submit" class="w-full bg-blue-400 rounded-md p-2 font-medium text-white flex justify-center items-center" :disabled="login">
                    <svg v-if="login" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Login</span>
                  </button>
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
    this.login = true
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email)) {
        this.$axios.post(`${process.env.apiUri}/api/login`, {
          email: this.email,
          password: this.password
        }).then(data => {
          console.log(data);
          if (data.request.status === 200 && data.data.token != null) {
            this.$swal.fire('Anda Berhasil Login', '', 'success')
            this.notification = "berhasil login"
            this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
              token: data.data.token
            }).then(dataToken => {
              this.$store.commit('addUser', dataToken.data.user[0])
            })
            localStorage.setItem("user_perpus", JSON.stringify(data.data.token))
            if (this.$route.query.next) {
              this.$router.push(this.$route.query.next);
            }else{
              this.$router.push('/admin');
            }
          } else if (data.request.status === 500) {
            this.login = false
            this.$swal.fire('Server error 500', 'ada kesalahan server, mohon tunggu beberapa saat', 'error')
            this.notification = "server error 500"
          } else {
            this.login = false
            this.$swal.fire('Email Atau Password Anda Salah', '', 'error')
            this.notification = "email atau password anda salah"
          }
        })
      } else {
        this.login = false
        this.notifEmail = true;
        setTimeout(() => {
          this.notifEmail = false;
        }, 4000);
      }
    }
},
}
</script>

<style>

</style>