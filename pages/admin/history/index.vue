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
              <div v-if="modal" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" id="modal-id">
                <div class="absolute bg-black opacity-40 -mt-2 inset-0 z-0"></div>
                <div class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                  <!--content-->
                  <div class="">
                    <!--body-->
                    <div v-if="book.length == 0 && history.length == 0" class="p-5 flex-auto justify-center space-y-3">
                     <div>
                      <p>user belum meminjam buku apapun</p>
                    </div>
                    </div>
                    <div v-else class="p-5 flex-auto justify-center space-y-3">
                      <div>
                        <h1 class="text-center font-bold text-2xl">History</h1>
                        <p class="text-center ">Peminjaman buku</p>
                      </div>
                      <div class="text-left">
                        <p>Nama : {{user.full_name}}</p>
                        <p>Email : {{user.email}}</p>
                      </div>
                      <div class="overflow-auto h-52">
                        <table class=" w-5/6 bg-gray-200 text-gray-800">
                <tr class="text-left border-b-2 border-gray-300">
                    <th class="px-4 py-3">No</th>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Author</th>
                    <th class="px-4 py-3">Borrow</th>
                    <th class="px-4 py-3">Finish Borrow</th>
                    <th class="px-4 py-3">Returning</th>
                 
                </tr>
                
                <tr class="bg-gray-100 border-b border-gray-200" v-for='(book, index) in sortedArray' :key='book.index'>
                    <td class="px-4 py-3">{{index+1}}</td>
                    <td class="px-4 py-3">{{book.name}}</td>
                    <td class="px-4 py-3">{{book.author}}</td>
                    <td class="px-4 py-3">{{tanggal(history[index].borrow)}}</td>
                    <td class="px-4 py-3">{{tanggal(history[index].finishBorrow)}}</td>
                    <td class="px-4 py-3">{{tanggal(history[index].createAt)}}</td>
                  
                </tr> 
              </table>
                      </div>
                    </div>
                    <!--footer-->
                    <div class="p-3  mt-2 text-center space-x-4 md:block">
                        <button  @click="(()=> {modal = false; book = []})"  class="mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg  bg-red-500 hover:bg-red-600">
                            Oke
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <table class=" w-5/6 bg-gray-200 text-gray-800">
                <tr class="text-left border-b-2 border-gray-300">
                    <th class="px-4 py-3">No</th>
                    <th class="px-4 py-3">Fullname</th>
                    <th class="px-4 py-3">Action</th>
                </tr>
                
                <tr class="bg-gray-100 border-b border-gray-200" v-for='(user, index) in users' :key='user.index'>
                    <td class="px-4 py-3">{{index+1}}</td>
                    <td class="px-4 py-3">{{user.full_name}}</td>
                    <td class="px-4 py-3">
                      <button @click="historyModal(user)">History</button>
                    </td>
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
        users:[],
        book:[],
        modal: false,
    }
},
methods:{
    historyModal(user){
      this.$axios.$get(`http://localhost:4000/api/history/user/${user._id}`).then(his => {
        this.history = his
        this.history.map(his => {
           this.$axios.$get(`http://localhost:4000/api/book/${his.book_id}`).then(book => {
            this.book.push(book);
          })
        })
      })
      this.user = user
      this.modal = true
    },
    tanggal(date) {
        return moment(date).format('LL')
    },
},
computed: {
  sortedArray: function() {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }

    return this.book.sort(compare);
  }
},
created(){
    this.$axios.$get('http://localhost:4000/api/user').then(users => {
      this.users = users
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