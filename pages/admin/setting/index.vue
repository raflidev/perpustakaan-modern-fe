<template>
   <div class="flex">
      <Sidebar/>
      <div class="w-full lg:w-5/6 min-h-screen">
        <div class="p-10">
          <div class="space-y-2 mb-6">
            <h1 class="font-bold text-2xl">
              Setting
            </h1>
            <p>Halaman Setting </p>
            <div>
              <div class="my-7 grid grid-flow-row gap-4 grid-cols-2 lg:grid-cols-3">
                <div class="px-4 py-5 bg-blue-100 rounded-md w-full">
                  <div class="mb-4">
                    <p class="font-bold text-xl">Ubah Profile</p>
                    <p>Edit Profile mu, Ubah nama atau username</p>
                  </div>
                  <div class="flex">
                    <router-link class="w-screen bg-white p-1 rounded-xl text-center" to="/admin/setting/user">Edit Sekarang</router-link>
                  </div>
                </div>
                <div class="px-4 py-5 bg-blue-100 rounded-md w-full">
                  <div class="mb-4">
                    <p class="font-bold text-xl">Ubah Password</p>
                    <p>Ubah passwordmu</p>
                  </div>
                  <div class="flex">
                    <router-link class="w-screen bg-white p-1 rounded-xl text-center" to="/admin/setting/change_password">Ubah</router-link>
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
export default {

}
</script>

<style>

</style>