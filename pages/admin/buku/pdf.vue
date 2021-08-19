<template>
  <div class="container mx-auto">
      <div class="grid grid-cols-5   gap-4">
        <div v-for="buku in buku" :key="buku.index">
            <div class="flex justify-center flex-col">
                <VueQrcode :value="buku._id" tag="img" :options="{ width: 300 }"></VueQrcode>
                <h1 class="text-sm text-center">{{buku.name}}</h1>
                <p class="text-xs text-center">{{buku.author}}</p>
            </div>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button @click="download" class="inline text-center bg-green-400 px-4 py-2 rounded text-white print:bottom-0 print:hidden">Download</button>
        <router-link to="/admin/buku" @click="download" class="inline text-center bg-red-600 px-4 py-2 rounded text-white print:bottom-0 print:hidden">Back to Admin</router-link>
      </div>
      <h1 class="absolute bottom-0 right-0 text-white print:text-black ">Perpustakaan Modern | {{time}} </h1>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
            buku: [],
            time: null
        }
    },
    methods:{
        download(){
            if(typeof window !== 'undefined'){
                window.print();
            }
        }
    },
    created(){
        this.$axios.$get('http://localhost:4000/api/book').then(a => {
            this.buku = a
        })
        this.time = moment().format('LL')
    }
}
</script>

<style>

</style>