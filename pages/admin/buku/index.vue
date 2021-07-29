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

            <div v-if="qr_id" class="absolute top-0 right-2 p-4 border border-black bg-white">
              <h1 class="text-center font-bold">Generate QR Code</h1>
              <p class="text-center">{{qr_name}}</p>
              <svg xmlns="http://www.w3.org/2000/svg"  @click="(()=> {qr_id = null})" class="h-6 w-6 absolute top-4 right-4 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div class="flex justify-center">
                <VueQrcode :value="qr_id" tag="img" :options="{ width: 280 }"></VueQrcode>
              </div>
              <p class="text-center">Download QRcode: <br> Klik kanan > Save image</p>
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