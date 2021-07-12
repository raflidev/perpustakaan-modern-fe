<template>
  <div>
    <Navbar/>
    <div class="flex justify-center space-x-6">
      <div class="w-1/2 h-3/4">
        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
          <div v-show="showScanConfirmation" class="scan-confirmation">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </qrcode-stream>
      </div>
      <div class="w-1/2">
        <h1 class="text-xl">Buku yang akan dipinjam</h1>
        <p class="decode-result">Scanan Terakhir: <b>{{ result }}</b></p>

        <div class="mt-4">
          <div v-if="buku.length == 0">
            <p class="text-center font-bold">Silakan Scan QR Code Untuk Menginput Buku</p>
          </div>
          <div  v-for="buku in buku" :key="buku.index" class="w-full bg-blue-100 border-2 border-black rounded p-4 mb-6">
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

          <div v-if="buku.length > 0">
            <button class="p-4 bg-yellow-300 font-bold rounded">Pinjam Buku </button>
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
    }
  },
  methods: {

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
        if (cekIndex < 0) {
          const buku = await this.$axios.$get(`http://localhost:4000/api/book/${kode}`)
          this.buku.push(buku)
          this.result = buku.name
          this.notification = `Berhasil menambahkan ${buku.name}`
        }else{
          this.notification = `Buku ${buku.name} hanya boleh dipinjam 1 saja`
        }
      }
    },

    deleteBook(id){
      const index = this.buku.map(x => x._id).indexOf(id);
      this.buku.splice(index, 1)
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