<template>
  <div>
    <Navbar/>
    <div class="container mx-auto px-8">
      <div class="h-screen">
        <div class=" flex justify-center space-x-6 items-center h-full">
          <div>
            <h1 class="text-7xl font-bold pb-10">Perpustakaan Modern Berbasis Komputer</h1>
            <router-link to="/auth/login" class="p-4 bg-blue-500 rounded text-white font-medium text-lg">Mulai Pinjam Buku!</router-link>
          </div>
          <img src="/6607.jpg" class="pt-3" width="800">
        </div>
      </div>
      <div class="h-screen py-8">
        <div class="pb-12 text-center">
          <h1 class="text-4xl font-bold pb-4">Keunggulan Sistem Kami</h1>
          <p class="text-xl">Keunggulan sistem kami terhadap perpustakaan konvensional, yaitu antara lain</p>
        </div>
        <div class="space-x-16 flex justify-center">
          <div class="w-40 h-40 items-center text-center border-2 border-black rounded">
            Berbasis QR Code
          </div>
          <div class="w-40 h-40 items-center text-center border-2 border-black rounded">
            Digitalisasi
          </div>
          <div class="w-40 h-40 items-center text-center border-2 border-black rounded">
            Pendataan Lebih Baik
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
name:"index",
}
</script>

<style>

</style>