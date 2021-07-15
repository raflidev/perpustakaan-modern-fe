<template>
  <div class="h-screen bg-blue-200">
  </div>
</template>

<script>
export default {
name: "logout",
created(){
    if(typeof window !== 'undefined'){
        this.$swal.fire('Anda Berhasil Logout', '', 'success')
        setTimeout(() => {
            this.$router.push('/');
        }, 500);
    }
}
}
</script>

<style>

</style>