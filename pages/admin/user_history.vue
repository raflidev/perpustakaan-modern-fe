<template>
  <div class="flex">
      <Sidebar/>
      <div class="w-full lg:w-5/6 h-screen">
        <div class="p-10">
          <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Buku yang anda pinjam
            </h1>
            <p>Detail Buku-Buku Yang Dipinjam</p>
          </div>
           <!-- animate-pulse -->
          <div v-if="buku.length == 0">
            <div class="grid grid-cols-3 gap-4" v-if="checkContent">
              <div class="bg-blue-100 p-4 rounded divide-y divide-black animate-pulse" v-for="a in 3" :key="a.index">
                <div class="pb-4">
                  <h1 class="font-bold text-xl w-full h-8 bg-blue-300 rounded">
                  </h1>
                  <div class="font-medium w-full h-4 bg-blue-300 rounded mt-2">
                    </div>
                </div>
                <div class="pt-4">
                  <div>
                    <div class="font-medium w-full h-4 bg-blue-300 rounded">
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="font-medium w-full h-4 bg-blue-300 rounded">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="bg-red-400 rounded p-4 text-white w-full lg:w-1/2">
                History tidak ada
              </p>
            </div>
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
      dataBuku: [],
      checkContent: true,
      pc: false,
      user: []
    }
  },
  methods: {
    tanggal(date) {
      return moment(date).format("LL")
    },
    deadline(date) {
      return moment().isBefore(date)
    },
  },
  async mounted() {
    if(typeof window !== 'undefined'){
    const local = localStorage.getItem('user_perpus');    
    const pc = localStorage.getItem('perpus_pc');    
    if (pc !== null) {
      this.pc = pc
    }
    if(local !== null) {
      const data = JSON.parse(local)
      try {
        
      } catch (error) {
        
      }
        this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
          token: data
        }).then(dataToken => {
          this.user = dataToken.data.user
          this.$axios.get(`${process.env.apiUri}/api/history/user/${dataToken.data.user._id}`).
          then(dataBuku => {
            this.dataBuku = dataBuku.data
            if(this.dataBuku.length === 0){
              this.checkContent = false
            }
            const cek = [];
            this.dataBuku.map(async (x) => {
              const buku = await this.$axios.$get(`${process.env.apiUri}/api/book/${x.book_id}`)
              cek.push(buku)
            })
            this.buku = cek
          })
        }).catch(() => {
          localStorage.removeItem('user_perpus')
          this.$router.push('/auth/login')
        })
      
    }
  } 
  }
}
</script>

<style>

</style>