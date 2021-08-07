<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
             <nav class="rounded font-sans w-full mb-4">
            <ol class="list-reset flex text-grey-dark space-x-2">
                <li><router-link to="/admin" class="text-blue font-bold hover:text-blue-600">Dashboard</router-link></li>
                <li>/</li>
                <li><router-link to="/admin/setting" class="text-blue font-bold hover:text-blue-600">Setting</router-link></li>
                <li>/</li>
                <li><router-link to="/admin/setting/change_password" class="text-blue hover:text-blue-600">Change Password</router-link></li>
            </ol>
            </nav>
            <div class="space-y-2">
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
                    <label for="password_lama">Password Lama</label>
                    <input id="password_lama" v-model="password_lama" type="password" name="password_lama" placeholder="Password lama" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notif_password_lama">
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
      password_lama: null,
      password: null,
      confirm_password: null,
      notif: null,
      notif_password_lama: false,
      notifPassword: false,
      notifConfirm_password: false,
      submit: false,
    }
},
methods: {
    checkData(){
        this.submit = true
        setTimeout(() => {
            this.submit = false
        }, 3000);

        if(!this.password){
            this.notifPassword = true
            setTimeout(() => {
                this.notifPassword = false
            }, 3000);
        }
        if(!this.password_lama){
            this.notif_password_lama = true
            setTimeout(() => {
                this.notif_password_lama = false
            }, 3000);
        }
        if(!this.confirm_password){
            this.notifConfirm_password = true
            setTimeout(() => {
                this.notifConfirm_password = false
            }, 3000);
        }
        const local = JSON.parse(localStorage.getItem("user_perpus"));
        if (local[0].password == this.password_lama && this.password === this.confirm_password) {
            this.$axios.put(`http://localhost:4000/api/user/${local[0]._id}`, {
              password: this.password
            }).then(data => {
                if (data.status == 200) {
                localStorage.removeItem('user_perpus')
                localStorage.setItem('user_perpus', JSON.stringify([data["data"]]))
                this.$swal.fire('Data berhasil diedit', '', 'success')
                this.$router.push('/admin')
                }
            })
        } else {
            this.notif = "password tidak sama atau data tidak sesuai"
            setTimeout(() => {
                this.notif = null
            }, 3000);
            this.password_lama = ''
            this.password = ''
            this.confirm_password = ''
        }
        
    }
}
}
</script>

<style>

</style>