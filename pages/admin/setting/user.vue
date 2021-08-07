<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
             <nav class="rounded font-sans w-full mb-4">
            <ol class="list-reset flex text-grey-dark space-x-2">
                <li><router-link to="/admin" class="text-blue font-bold hover:text-blue-600">Dashboard</router-link></li>
                <li>/</li>
                <li><router-link to="/admin/user" class="text-blue font-bold hover:text-blue-600">Setting</router-link></li>
            </ol>
            </nav>
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Setting
            </h1>
            <form @submit.prevent="checkData" class="w-1/2 my-5 space-y-4">
              <div v-if="submit && notif" class="bg-red-500 text-white p-2 rounded my-3 flex items-center space-x-1">
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                  </div>
                  <p>
                      {{notif}}
                  </p>
              </div>
                <div>
                    <label for="username">Username</label>
                    <input id="username" v-model="username" type="text" name="username" placeholder="username" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifUsername">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                </div>
                <div>
                    <label for="fullname">Fullname</label>
                    <input id="fullname" v-model="fullname" type="text" name="fullname" placeholder="fullname" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifFullname">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" v-model="email" @change="regexEmail" type="text" name="email" placeholder="Email" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="!emailConfirm && submit">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Email tidak valid
                      </span>
                    </div>
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifEmail">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" name="password" placeholder="Password" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifPassword">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                </div>
                <div>
                    <label for="confirm_password">Confirm Password</label>
                    <input id="confirm_password" v-model="confirm_password" type="password" name="confirm_password" placeholder="Confirm Password" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="password != confirm_password">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Password tidak cocok
                      </span>
                    </div>
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifConfirm_password">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                  <button type="submit" class="w-full mt-6 bg-blue-400 rounded-md p-2 font-medium text-white">Edit User</button>
                </div>
              </form>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
name:"addBuku",
data(){
    return {
      fullname: null,
      username: null,
      email: null,
      password: null,
      emailConfirm: false,
      confirm_password: null,
      notifFullname: false,
      notifUsername: false,
      notifEmail: false,
      notifPassword: false,
      notifConfirm_password: false,
      submit: false,
      notif: null
    }
},
created() {
    if (typeof window !== 'undefined') {
      const local = JSON.parse(localStorage.getItem("user_perpus"));
      this.$axios.$get(`http://localhost:4000/api/user/${local[0]._id}`).then(user => {
          this.fullname = user.full_name;
          this.username = user.username;
          this.email = user.email;
      })
    }
},
methods: {
    regexEmail(){
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(this.email)){
        this.emailConfirm = true
      }else{
        this.emailConfirm = false
      }
    },
    checkData(){
        this.submit = true
        setTimeout(() => {
            this.submit = false
        }, 3000);
        const local = JSON.parse(localStorage.getItem("user_perpus"));
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(this.email)){
          if ((local[0].password == this.password && this.confirm_password == local[0].password)) {
          if(this.fullname != null || this.username != null || this.email != null || this.password != null || this.confirm_password != null) {
              this.$axios.put(`http://localhost:4000/api/user/${local[0]._id}`, {
                  full_name: this.fullname,
                  username: this.username,
                  email: this.email,
                  valid: true,
                  role: true
              }).then(data => {
                  if (data.status == 200) {
                    localStorage.removeItem('user_perpus')
                    localStorage.setItem('user_perpus', JSON.stringify([data["data"]]))
                    this.$swal.fire('Data berhasil diedit', '', 'success')
                    this.$router.push('/admin')
                  }
              })
          }else{
              if(!this.fullname){
                  this.notifFullname = true
                  setTimeout(() => {
                      this.notifFullname = false
                  }, 3000);
              }
              if(!this.username){
                  this.notifUsername = true
                  setTimeout(() => {
                      this.notifUsername = false
                  }, 3000);
              }
              if(!this.password){
                  this.notifPassword = true
                  setTimeout(() => {
                      this.notifPassword = false
                  }, 3000);
              }
              if(!this.email){
                  this.notifEmail = true
                  setTimeout(() => {
                      this.notifEmail = false
                  }, 3000);
              }
              if(!this.confirm_password){
                  this.notifConfirm_password = true
                  setTimeout(() => {
                      this.notifConfirm_password = false
                  }, 3000);
              }
          }
          }else{
            this.notif = "password tidak sama atau data tidak sesuai"
            setTimeout(() => {
                this.notif = null
            }, 3000);
            this.password = ''
            this.confirm_password = ''
          }
        }
    }
}
}
</script>

<style>

</style>