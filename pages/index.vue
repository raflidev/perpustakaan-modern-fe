<template>
  <div id="home">
    <Navbar/>
    <div>
      <div class="mt-40 container mx-auto px-8">
        <div class="flex justify-center space-x-6 items-center -mt-12 h-full">
          <div class="w-2/6">
            <h1 class="text-5xl font-bold pb-10">Perpustakaan Modern Berbasis Komputer</h1>
            <router-link v-if="user.length === 0" to="/auth/login" class="p-4 bg-blue-500 rounded text-white font-medium text-lg">Mulai Pinjam Buku!</router-link>
            <router-link v-else to="/admin" class="p-4 bg-blue-500 rounded text-white font-medium text-md">Mulai Pinjam Buku!</router-link>
          </div>
          <div class="w-4/6">
          <img src="/6607.jpg" alt="perpustakaan" class="pt-3">
          </div>
        </div>
      </div>
      <div id="feature" class="bg-blue-500 mt-40 py-10" data-aos="fade-right">
        <div class="flex justify-center items-center text-white container mx-auto px-8">
          <div class="w-2/3">
            <div class="font-bold text-4xl leading-tight">Cukup Scan QR untuk Meminjam dan Mengembalikan Buku</div>
          </div>
          <div class="w-1/3  flex justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-3/5 w-3/5 pb-4 px-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white py-10" data-aos="fade-left">
        <div class="flex justify-center items-center text-blue-500 container mx-auto px-8">
          <div class="w-1/3 flex justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-3/5 w-3/5 pb-4 px-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="w-2/3">
            <div class="font-bold text-4xl leading-tight">Aplikasi telah Digitalisasi, Hanya perlu mengelola via Online </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-500 py-10" data-aos="fade-right">
        <div class="flex justify-center items-center text-white container mx-auto px-8">
          <div class="w-2/3">
            <div class="font-bold text-4xl leading-tight">Pendataan pada Aplikasi lebih efektif dibanding lewat kertas</div>
          </div>
          <div class="w-1/3  flex justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-3/5 w-3/5 pb-4 px-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="py-32 px-4 md:px-0 flex justify-center">
        <div class="text-center w-full md:w-1/2 space-y-2">
          <h1 class="text-4xl font-medium italic">
            Once you learn to read, you will be forever free.
          </h1>
          <p>—Frederick Douglass</p>
        </div>
      </div>
      <div class="py-40 bg-blue-500 flex justify-center text-white" id="fasttrack">
        <div class="w-2/5 space-y-8">
          <h1 class="font-bold text-center text-4xl">
            Tunggu apa lagi? <br> Cobain Fast Track Untuk Pengaksesan lebih cepat
          </h1>
          <div class="flex justify-center space-x-5">
            <router-link to="/pinjam?ft=1" class="py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded">Pinjam</router-link>
            <router-link to="/pengembalian?ft=1" class="py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded">Kembalikan</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="px-8 py-10 bg-blue-500 text-white">
      <div class="container mx-auto">
        <div class="flex justify-between">
          <div class="w-3/12 space-y-2">
            <div>
              <h1 class="font-bold text-2xl">
                PerpusModern
              </h1>
              <p>Perpustakaan Modern adalah platform untuk Pinjam-meminjam Buku yang lebih mudah dan efektif</p>
            </div>
            <p>&copy; PerpusModern 2021</p>
          </div>
          <div class="w-3/12">
          <div class="flex flex-col h-full justify-end text-right">
            <p>rafli@bekasidev.org</p>
          </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<style>
body{
  font-family: 'Poppins', sans-serif;
}
</style>

<script>
export default {
name:"index",
data(){
  return {
    user: []
  }
},
created(){
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('user_perpus');
    if (local !== null) {
      const user = JSON.parse(local)
      this.user = user
    }
  }
}
}
</script>