<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-5/6 h-screen">
        <div class="p-10">
          <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Buku yang anda pinjam
            </h1>
            <p>Detail Buku-Buku Yang Dipinjam</p>
          </div>
          <div v-if="buku.length == 0" class="bg-red-400 rounded p-4 text-white">
            Library anda kosong, silakan pinjam buku
          </div>
          <div v-else>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-blue-100 p-4 rounded divide-y divide-black" v-for="(buku, index) in buku" :key="buku.index">
                <div class="pb-4">
                  <h1 class="font-bold text-xl">
                    {{buku.name}}
                  </h1>
                  <p>
                    {{buku.author}}
                  </p>
                </div>
                <div class="pt-4">
                  <div>
                    <span class="font-medium">
                      Meminjam: 
                    </span>
                    {{tanggal(dataBuku[index].createAt)}}
                  </div>
                  <div>
                    <span class="font-medium">
                      Kembalikan Sebelum: 
                    </span>
                    {{tanggal(dataBuku[index].finishBorrow)}}
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
import moment from 'moment'
export default {
  name: "admin",
  data(){
    return {
      buku: [],
      dataBuku: []
    }
  },
  methods: {
    tanggal(date) {
      return moment(date).format("LL")
    },
    deadline(date) {
      return moment(date).format("LL")
    }
  },
  async created() {
    if(typeof window !== 'undefined'){
    const local = localStorage.getItem('user_perpus');
    if(local !== null) {
      const data = JSON.parse(local)
      const dataBuku = await this.$axios.$get(`http://localhost:4000/api/borrow/user/${data[0]._id}`)
      this.dataBuku = dataBuku
      dataBuku.map(async (x) => {
        const buku = await this.$axios.$get(`http://localhost:4000/api/book/${x.book_id}`)
        this.buku.push(buku)
      })
    }
  } 
  }
}
</script>

<style>

</style>