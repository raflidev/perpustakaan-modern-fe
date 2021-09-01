<template>
  <div>
    <Navbar/>
    <div class="flex justify-center space-x-6 mt-28">
      <div class="w-1/2 h-3/4">
        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
          <div v-show="showScanConfirmation" class="scan-confirmation">
          </div>
        </qrcode-stream>
      </div>
      <div class="w-1/2">
        <h1 class="text-2xl font-medium">Buku yang akan dipinjam</h1>
        <p class="decode-result">Scanan Terakhir: <b>{{ result }}</b></p>
        <div class="mt-3">
          <a href="/admin/buku/pdf" class="bg-red-600 px-4 py-2 rounded-md font-medium text-white">LIST SEMUA QRCODE</a>
        </div>
        <div class="mt-4">
          <div v-if="buku.length == 0">
            <p class="text-center font-bold mt-60">Silakan Scan QR Code Untuk Menginput Buku</p>
          </div>
          <div class="overflow-y-auto h-96">
            <div v-for="buku in buku" :key="buku.index" class="w-full bg-blue-100 border-2 border-black rounded p-4 mb-6">
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-xl font-bold">
                    {{buku.name}}
                  </div>
                  <div>
                    {{buku.author}}
                  </div>
                </div>
                <div>
                  <button @click="deleteBook(buku._id)" class="py-2 px-4 bg-red-500 rounded text-white font-bold">Delete</button>
                </div>
              </div>

            </div>
          </div>

          <div v-if="buku.length > 0" class="mt-3">
            <button class="p-4 bg-yellow-300 font-bold rounded" @click="borrowBook">Pinjam Buku </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "QR",
  data () {
    return {
      camera: 'auto',
      result: null,
      showScanConfirmation: false,
      a: null,
      buku: [],
      user: [],
    }
  },
  methods: {
    borrowBook() {
      this.$swal.fire({
      title: 'Ingin meminjam buku?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Pinjam`,
    }).then((result) => { 
      if (result.isConfirmed) {
        this.buku.map(buku => {
          this.$axios.post(`${process.env.apiUri}/api/borrow`, {
            user_id: this.user._id,
            book_id: buku._id
          }).then(() => {
          this.$swal.fire('Berhasil meminjam buku', '', 'success')
          this.buku = []
          }).catch(err => {
          this.$swal.fire('Gagal meminjam buku', err, 'error')
          })
        })
      }
    })
    },
    async onInit (promise) {
      try {
        await promise
      } catch (e) {
        console.error(e)
      } finally {
        this.showScanConfirmation = this.camera === "off"
      }
    },

    async onDecode (content) {
      this.cekBuku(content)

      this.pause()
      await this.timeout(500)
      this.unpause()

    },

    unpause () {
      this.camera = 'auto'
    },

    pause () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },
    
    async cekBuku(kode) {
      if(kode !== null) {
        const cekIndex = this.buku.map(x => x._id).indexOf(kode);
        if (cekIndex >= 0) {
          this.$swal.fire('buku hanya boleh dipinjam 1', '', 'error');
        }
        if (cekIndex == -1) {
          this.$axios.$get(`${process.env.apiUri}/api/borrow/${kode}/user/${this.user._id}`)
          .then(daftarBuku => {
            if (daftarBuku.length > 0) {
            this.$swal.fire('buku sudah anda pinjam', '', 'error');
            }
            if (daftarBuku.length == 0) {
              this.$axios.$get(`${process.env.apiUri}/api/book/${kode}`).then(buku => {
                this.buku.push(buku)
                this.result = buku.name
                this.$swal.fire(`Berhasil menambahkan ${buku.name}`, '', 'success');
              })
            }
          });
         
        }
      }
    },

    deleteBook(id){
      const index = this.buku.map(x => x._id).indexOf(id);
      this.buku.splice(index, 1)
    }
  },
  mounted(){
    if (typeof window !== 'undefined') {
      if(window.innerWidth < 1280) {
        this.$swal.fire('Masalah Perangkat', 'silakan menggunakan PC', 'error');
        this.$router.push('/admin')
      }
      const user = JSON.parse(localStorage.getItem('user_perpus'));
      if (user == null) {
        this.$swal.fire('Belum login', 'silakan login terlebih dahulu', 'error');
        if (this.$route.query.ft == 1){
          this.$router.push('/auth/login?next=/pinjam?ft=1')
        }else{
          this.$router.push('/auth/login')
        }
      }else{
        this.$axios.post(`${process.env.apiUri}/api/veriftoken`, {
          token: user
        }).then(dataToken => {
          this.user = dataToken.data.user
          if (!this.user.valid) {
            this.$swal.fire('Akun belum dikonfirmasi', 'silakan ke perpus untuk daftar ulang', 'error');
            this.$router.push('/admin')
          }
          const pc = localStorage.getItem('perpus_pc');
          if(!pc) {
            this.$swal.fire('Tidak punya hak', 'silakan ke perpus untuk meminjam buku. (komputer bukan superuser)', 'error');
            this.$router.push('/admin')
          }
        }).catch(() => {
          localStorage.removeItem('user_perpus')
          this.$router.push('/auth/login')
        })
      }
    }
  }
}
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>