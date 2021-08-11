<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
             <nav class="rounded font-sans w-full mb-4">
            <ol class="list-reset flex text-grey-dark space-x-2">
                <li><router-link to="/admin" class="text-blue font-bold hover:text-blue-600">Dashboard</router-link></li>
                <li>/</li>
                <li><router-link to="/admin/user" class="text-blue font-bold hover:text-blue-600">User</router-link></li>
                <li>/</li>
                <li>Tambah User</li>
            </ol>
            </nav>
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Tambah User
            </h1>
              <form class="w-1/2 my-5 space-y-4" @submit.prevent="addData">
                <div v-if="alert" class="bg-red-700 py-2 px-4 text-white rounded">
                  {{notification}}
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
                    <label for="admin">Admin</label>
                    <select name="admin" id="admin" v-model="admin" class="rounded-md border-blue-400 border w-full p-2">
                      <option disabled value="">Please select one</option>
                      <option :value="true">Ya</option>
                      <option :value="false">Bukan</option>
                    </select>
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
                </div>
                <button type="submit" class="w-full bg-blue-400 rounded-md p-2 font-medium text-white">Tambah User</button>
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
        admin: false,
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
        notification: null,
        alert: false,
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
    addData(){
        this.submit = true
        setTimeout(() => {
            this.submit = false
        }, 3000);
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(this.email)){
          if(this.fullname != null || this.username != null || this.email != null || this.password != null || this.confirm_password != null) {
              this.$axios.post('http://localhost:4000/api/user', {
                  full_name: this.fullname,
                  username: this.username,
                  email: this.email,
                  password: this.password,
                  valid: true,
                  role: this.admin,
              }).then(data => {
                  if (data.status == 200) {
                      this.fullname = null,
                      this.username = null,
                      this.email = null,
                      this.password = null,
                      this.confirm_password = null,
                      this.$swal.fire('Buku berhasil ditambahkan', '', 'success')
                  }
              }).catch(() => {
                  this.alert = true
                  this.notification = "email or password has been registered"
                  setTimeout(() => {
                      this.alert = false
                  }, 3000);
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