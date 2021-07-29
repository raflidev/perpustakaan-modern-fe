<template>
  <div>
    <Navbar/>
    <div class="container mx-auto px-8">
      <div class="mt-40">
        <div class="flex justify-center space-x-6 items-center -mt-12 h-full">
          <div>
            <h1 class="text-7xl font-bold pb-10 w-full">Perpustakaan Modern Berbasis Komputer</h1>
            <router-link to="/auth/login" class="p-4 bg-blue-500 rounded text-white font-medium text-lg">Mulai Pinjam Buku!</router-link>
          </div>
          <div class="w-full">
          <img src="/6607.jpg" alt="perpustakaan" class="pt-3" width="800">
          </div>
        </div>
      </div>
      <div class="mt-40 py-8">
        <div class="pb-12 text-center">
          <h1 class="text-4xl font-bold pb-4">Keunggulan Sistem Kami</h1>
          <p class="text-xl">Keunggulan sistem kami terhadap perpustakaan konvensional, yaitu antara lain</p>
        </div>
        <div class="space-x-16 flex justify-center">
          <div class="w-40 h-40 items-center text-center rounded">
            <span class="font-medium">
              Berbasis QR Code
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full pb-4 px-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <div class="w-40 h-40 items-center text-center rounded">
            <span class="font-medium">
              Digitalisasi
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full pb-4 px-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="w-40 h-40 items-center text-center rounded">
            <span class="font-medium">
              Pendataan Lebih Baik
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full pb-4 px-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
name:"index"
}
</script>

<style>
.image-blur {
    width: 100%;
    height: 400px;
  }
</style>