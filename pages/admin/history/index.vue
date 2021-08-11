<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              History
            </h1>
            <p>Halaman management History </p>
            <div>
            <div class="my-7">
              <router-link to="/admin/buku/add" class="bg-green-500 px-4 py-2 rounded text-white">Tambah Buku</router-link>   
            </div>
              <table v-if="history.length == user.length && history.length == book.length" class=" w-5/6 bg-gray-200 text-gray-800">
                <tr class="text-left border-b-2 border-gray-300">
                    <th class="px-4 py-3">Fullname</th>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Author</th>
                    <th class="px-4 py-3">Borrow</th>
                    <th class="px-4 py-3">Finish Borrow</th>
                    <th class="px-4 py-3">Returning</th>
                </tr>
                
                <tr class="bg-gray-100 border-b border-gray-200" v-for='(history, index) in history' :key='history.index'>
                    <td class="px-4 py-3">{{user[index].full_name}}</td>
                    <td class="px-4 py-3">{{book[index].name}}</td>
                    <td class="px-4 py-3">{{book[index].author}}</td>
                    <td class="px-4 py-3">{{tanggal(history.borrow)}}</td>
                    <td class="px-4 py-3">{{tanggal(history.finishBorrow)}}</td>
                    <td class="px-4 py-3">{{tanggal(history.createAt)}}</td>
                </tr> 
                </table>
            </div>
          </div>
         </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
name:"history",
data(){
    return{
        history:[],
        user:[],
        book:[],
        qr_id: null,
        qr_name: null
    }
},
methods:{
    tanggal(date) {
        return moment(date).format('LL')
    },
},
created(){
    this.$axios.$get('http://localhost:4000/api/history').then(history => {
        this.history = history
    }).then(() => {

        this.history.map(history => {
          this.$axios.$get('http://localhost:4000/api/book/'+history.book_id).then(book => {
            this.book.push(book)
          })
          this.$axios.$get('http://localhost:4000/api/user/'+history.user_id).then(user => {
            this.user.push(user)
          })
        })
    })
    if(typeof window !== 'undefined'){
      const local = JSON.parse(localStorage.getItem('user_perpus'))
      if (!local[0].role) {
        this.$swal.fire('Tidak punya hak', 'anda bukan admin', 'error');
        this.$router.push('/admin')
      }
    }
},
}
</script>

<style>

</style>