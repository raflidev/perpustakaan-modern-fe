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
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4" v-if="checkContent">
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
                Library anda kosong, silakan pinjam buku
              </p>
            </div>
          </div>
          <div v-else>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
                      Status: 
                    </span>
                    <span v-if="deadline(dataBuku[index].finishBorrow)" class="text-green-500 font-bold">Dipinjamkan</span>
                    <span v-else class="text-red-500 font-bold">Segera Kembalikan</span>
                  </div>
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

          
          <div class="mt-10" v-if='user.role'>
            <button v-if="!pc" class="py-2 px-4 bg-blue-600 text-white rounded text-left" @click="superUser">Jadikan Komputer Superuser</button>
            <button v-else class="py-2 px-4 bg-blue-600 text-white rounded text-left" @click="nonSuperUser">Non-aktifkan Komputer Superuser</button>
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
    superUser() {
      this.$swal.fire({
      title: 'Jadikan Komputer Superuser?',
      icon: 'question',
      text: 'komputer ini akan jadi alat pinjam dan pengembalian buku',
      showCancelButton: true,
      confirmButtonText: `Ya`,
    }).then((result) => { 
      if (result.isConfirmed) {
       localStorage.setItem("perpus_pc", true);
       const pc = localStorage.getItem('perpus_pc');
       this.pc =pc
       this.$swal.fire('Berhasil', "Komputer ini menjadi superuser", 'success');
       setTimeout(() => {
         this.$router.go(0)
       }, 1000);
      }
    })
    },
    nonSuperUser() {
      this.$swal.fire({
      title: 'Berhentikan Komputer Superuser?',
      icon: 'question',
      text: 'status komputer ini hilang jadi alat pinjam dan pengembalian buku',
      showCancelButton: true,
      confirmButtonText: `Ya`,
    }).then((result) => { 
      if (result.isConfirmed) {
       localStorage.removeItem('perpus_pc');
       this.pc = false
       this.$swal.fire('Berhasil', "Komputer ini bukan superuser lagi", 'success');
       setTimeout(() => {
         this.$router.go(0)
       }, 1000);
      }
    })
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
      this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
        token: data
      }).then(dataToken => {
        this.user = dataToken.data.user
        this.$axios.get(`${process.env.apiUri}/api/borrow/user/${dataToken.data.user._id}`).
        then(dataBuku => {
          this.dataBuku = dataBuku.data
          if(this.dataBuku.length === 0){
            this.checkContent = false
          }
          this.dataBuku.map(async (x) => {
            const buku = await this.$axios.$get(`${process.env.apiUri}/api/book/${x.book_id}`)
            this.buku.push(buku)
          })
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