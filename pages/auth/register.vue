<template>
  <div>
      <Navbar/>
      <div class="min-h-screen">
          <div class="flex h-full justify-center items-center">
              <div class="w-1/3 min-h-0 bg-white rounded-md p-4 border border-black my-10">
                <div class="text-center">
                    <h1 class="font-bold text-2xl">Register</h1>
                    <p>Silakan buat akun terlebih dahulu</p>
                </div>
                 <div v-if="notification != null" :class="{'bg-green-500': register}" class="text-center bg-red-500 p-2 rounded-md text-white my-3">
                  {{notification}}
                </div>
                <form class="my-5 space-y-4" @submit.prevent="tryRegis">
                  <div>
                    <label for="username">Username</label>
                    <input type="username" v-model="username" name="username" placeholder="username" id="username" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="fullname">Full Name</label>
                    <input type="fullname" v-model="full_name" name="fullname" placeholder="fullname" id="fullname" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input type="email" v-model="email" name="email" @change="regexEmail" placeholder="email" id="email" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input type="password" v-model="password" name="password" placeholder="password" id="password" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="comfirm_password">Comfirm password</label>
                    <input type="password" v-model="confirm_password" name="comfirm_password" placeholder="Comfirm password" id="confirm" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <button v-if="(password != null && confirm_password != null) && password == confirm_password && emailConfirm" type="submit" class="w-full bg-blue-400 rounded-md p-2 font-medium text-white">Register</button>
                  <button v-else class="w-full bg-gray-400 rounded-md p-2 font-medium" disabled>Register</button>
                </form>
                  <p class="mt-3">Sudah punya akun? <router-link class="text-blue-700" to="/auth/login">Login</router-link> </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
name:"register",
data(){
  return{
    full_name:null,
    email:null,
    username:null,
    password:null,
    confirm_password:null,
    notification: null,
    register: false,
    emailConfirm: false
  }
},
methods:{
  // tamnbahan untuk user verification
  regexEmail(){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.email)){
      this.emailConfirm = true
    }else{
      this.emailConfirm = false
    }
  },
  tryRegis(){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.email)){
      this.$axios.$post("http://localhost:4000/api/user", {
        full_name:this.full_name,
        email:this.email,
        username:this.username,
        password:this.password,
        valid:false,
        role:false,
      }).then(()=>{
        this.full_name=null,
        this.email=null,
        this.username=null,
        this.password=null,
        this.confirm_password=null
  
        this.notification = "berhasil membuat akun"
        this.register = true
        setTimeout(() => {
          this.$router.push("/")
        }, 3000);
      }).catch(() => {
        this.register = false
        this.notification = "username or email has been registered"
      })
    }
  }
}
}
</script>

<style>

</style>