<template>
    <div>   
    <!-- <vue-qrcode :value="data[0]._id" width=300 /> -->
    <vue-qrcode v-if="data != null" :value="data[1]._id" :width="300" />
    </div>
</template>
<script>
import VueQrcode from 'vue-qrcode'

export default {
    name:"generate",
    data(){
        return{
            data:null
        }
    },
    components: {
        VueQrcode,
    },
    async mounted(){
      var data = await this.$axios.$get("http://localhost:4000/api/book")
      this.data = data
  },

}
</script>