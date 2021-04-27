<template>
  <div>
      <div class="w-screen h-screen bg-gray-400">
          <div class="flex h-full justify-center items-center">
              <div class="w-1/3 min-h-0 bg-white rounded-md p-4">
                <div class="text-center">
                    <h1 class="font-bold text-2xl">Register</h1>
                    <p>Silakan buat akun terlebih dahulu</p>
                </div>
                <div class="my-5 space-y-4">
                  <div>
                    <label for="username">Username</label>
                    <input type="username" v-model="username" name="username" placeholder="username" id="" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input type="email" v-model="email" name="email" placeholder="email" id="" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input type="password" v-model="password" name="password" placeholder="password" id="" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                  <div>
                    <label for="comfirm_password">Comfirm password</label>
                    <input type="password" v-model="confirm_password" name="comfirm_password" placeholder="Comfirm password" id="" class="rounded-md border-blue-400 border w-full p-2">
                  </div>
                </div>
                  <button v-if="(password != null && confirm_password != null) && password == confirm_password" type="submit" @click="tryRegis()" class="w-full bg-blue-400 rounded-md p-2 font-medium">Register</button>
                  <button v-else class="w-full bg-gray-400 rounded-md p-2 font-medium" disabled>Register</button>
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
    confirm_password:null
  }
},
methods:{
  tryRegis(){
    this.$axios.$post("http://localhost:4000/api/user", {
      full_name:this.full_name,
      email:this.email,
      username:this.username,
      password:this.password,
      valid:false,
    }).then(()=>{
      this.full_name=null,
      this.email=null,
      this.username=null,
      this.password=null,
      this.confirm_password=null
    })
  }
}
}
</script>

<style>

</style>