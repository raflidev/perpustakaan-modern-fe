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
                <li>Edit Data</li>
            </ol>
            </nav>
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Edit Buku
            </h1>
            <form @submit.prevent="editData" class="w-1/2 my-5 space-y-4">
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
                <button type="submit" class="mt-6 w-full bg-blue-400 rounded-md p-2 font-medium text-white">Edit Data</button>
            </form>
          </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
name:"editBuku",
data(){
    return {
        author: null,
        title: null,
        notifAuthor: false,
        notifTitle: false,
    }
},
created() {
    this.$axios.$get(`http://localhost:4000/api/book/${this.$route.params.id}`).then(buku => {
        this.author = buku.author,
        this.title = buku.name
    })
},
methods: {
    editData(){
        if(this.author != null || this.title != null) {
            this.$axios.put(`http://localhost:4000/api/book/${this.$route.params.id}`, {
                name: this.title,
                author: this.author
            }).then(data => {
                if (data.status == 200) {
                    this.$swal.fire('Buku berhasil diedit', '', 'success')
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