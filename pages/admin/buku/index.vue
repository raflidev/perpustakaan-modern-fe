<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 min-h-screen">
         <div class="p-10">
            <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Buku
            </h1>
            <p>Halaman management buku </p>
            <div>
            <div class="my-7">
              <router-link to="/admin/buku/add" class="bg-green-500 px-4 py-2 rounded text-white">Tambah Buku</router-link>   
            </div>
              <table class=" w-5/6 bg-gray-200 text-gray-800">
                <tr class="text-left border-b-2 border-gray-300">
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Author</th>
                    <th class="px-4 py-3">Created At</th>
                    <th class="px-4 py-3">Action</th>
                </tr>
                
                <tr class="bg-gray-100 border-b border-gray-200" v-for='(buku) in buku' :key='buku.index'>
                    <td class="px-4 py-3">{{buku.name}}</td>
                    <td class="px-4 py-3">{{buku.author}}</td>
                    <td class="px-4 py-3">{{tanggal(buku.createAt)}}</td>
                    <td class="px-4 py-3">
                        <router-link :to="'/admin/buku/'+buku._id+'/edit'" class="px-4 py-2 bg-yellow-300 text-black rounded text-xs">Edit</router-link>
                        <button @click="bukuDelete(buku._id)" class="px-4 py-2 bg-red-600 text-white rounded text-xs">Delete</button>
                        <button @click="(()=> {qr_id = buku._id; qr_name  = buku.name})" class="px-4 py-2 bg-blue-600 text-white rounded text-xs">QR Code</button>
                    </td>
                </tr> 
                </table>
            </div>
            <div v-if="qr_id" class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" id="modal-id">
                <div class="absolute bg-black opacity-40 -mt-2 inset-0 z-0"></div>
                <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                  <!--content-->
                  <div class="">
                    <!--body-->
                    <div class="text-center p-5 flex-auto justify-center">
                      <h1 class="text-center font-bold">Generate QR Code</h1>
                      <p class="text-center">{{qr_name}}</p>
                      <div class="flex justify-center">
                        <VueQrcode :value="qr_id" tag="img" :options="{ width: 300 }"></VueQrcode>
                      </div>
                      <p class="text-center">Download QRcode: <br> Klik kanan > Save image</p>
                    </div>
                    <!--footer-->
                    <div class="p-3  mt-2 text-center space-x-4 md:block">
                        <button  @click="(()=> {qr_id = null})"  class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg  bg-red-500 hover:bg-red-600">
                            Oke
                        </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
         </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
name:"buku",
data(){
    return{
        buku:[],
        qr_id: null,
        qr_name: null
    }
},
methods:{
    tanggal(date) {
        return moment(date).format('LL')
    },
    bukuDelete(id){
        this.$swal.fire({
      icon: 'question',
      title: 'Ingin Menghapus Buku?',
      showCancelButton: true,
      confirmButtonText: `Ya`
    }).then((result) => {
      if (result.isConfirmed) {
        this.$axios.delete(`http://localhost:4000/api/book/${id}`).then(data => {
            if(data.status == 200) {
                this.$swal.fire('Buku berhasil dihapus', '' , 'success')
                this.$router.go(0)
            }
        })
      }
    })
    }
},
created(){
    this.$axios.$get('http://localhost:4000/api/book').then(buku => {
        this.buku = buku
    })
}
}
</script>

<style>

</style>