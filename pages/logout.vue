<template>
  <div class="h-screen bg-blue-200">
  </div>
</template>

<script>
export default {
name: "logout",
created(){
    if(typeof window !== 'undefined'){
        localStorage.removeItem('user_perpus');
        if (localStorage.getItem('user_perpus') == null) {
            this.$swal.fire('Anda Berhasil Logout', '', 'success')
            setTimeout(() => {
                this.$router.push('/');
            }, 500);
        }else {
            this.$swal.fire('Anda Gagal Logout', '', 'error')
        }
    }
}
}
</script>

<style>

</style>