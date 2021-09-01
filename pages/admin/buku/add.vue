<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
             <nav class="rounded font-sans w-full mb-4">
            <ol class="list-reset flex text-grey-dark space-x-2">
                <li><router-link to="/admin" class="text-blue font-bold hover:text-blue-600">Dashboard</router-link></li>
                <li>/</li>
                <li><router-link to="/admin/buku" class="text-blue font-bold hover:text-blue-600">Buku</router-link></li>
                <li>/</li>
                <li>Tambah Data</li>
            </ol>
            </nav>
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Tambah Buku
            </h1>
            <form @submit.prevent="addData" class="w-1/2 my-5 space-y-4">
                <div>
                    <label for="title">Title</label>
                    <input id="title" v-model="title" type="text" name="title" placeholder="Title" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifTitle">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                </div>
               <div>
                    <label for="Author">Author</label>
                    <input id="author" v-model="author" type="text" name="author" placeholder="Author" class="rounded-md border-blue-400 border w-full p-2">
                    <div class="text-xs text-red-700 flex space-x-1 mt-2" v-if="notifAuthor">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>
                        Data tidak boleh kosong
                      </span>
                    </div>
                </div>
                <button type="submit" class="w-full mt-6 bg-blue-400 rounded-md p-2 font-medium text-white">Tambah Data</button>
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
        author: null,
        title: null,
        notifAuthor: false,
        notifTitle: false,
        user:[],
    }
},
methods: {
    addData(){
        if(this.author != null || this.title != null) {
            this.$axios.post(`${process.env.apiUri}/api/book`, {
                name: this.title,
                author: this.author,
            }).then(data => {
                if (data.status == 200) {
                    this.author = null
                    this.title = null
                    this.$swal.fire('Buku berhasil ditambahkan', '', 'success')
                    this.$router.push('/admin/buku')
                }
            })
        }else{
            if(!this.notifAuthor){
                this.notifAuthor = true
                setTimeout(() => {
                    this.notifAuthor = false
                }, 3000);
            }
            if(!this.notifTitle){
                this.notifTitle = true
                setTimeout(() => {
                    this.notifTitle = false
                }, 3000);
            }
        }
    }
},
mounted(){
const local = JSON.parse(localStorage.getItem('user_perpus'))
  this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
    token: local
  }).then(dataToken => {
      this.user = dataToken.data.user
      if (!this.user.role) {
        this.$swal.fire('Tidak punya hak', 'anda bukan admin', 'error');
        this.$router.push('/admin')
      }
  }).catch(() => {
    localStorage.removeItem('user_perpus')
    this.$router.push('/auth/login')
  })
},
}
</script>

<style>

</style>