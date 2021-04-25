<template>
  <div>
    <div class="flex w-screen">
      <div class="w-1/2">

      <p class="decode-result">Last result: <b>{{ result }}</b></p>

      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
        <div v-if="validationSuccess" class="validation-success">
          {{data[data.length]}}
        </div>

        <div v-if="validationFailure" class="validation-failure">
          Book not found
        </div>

        <div v-if="validationPending" class="validation-pending">
          Long validation in progress...
        </div>
      </qrcode-stream>
      </div>
      <div class="w-1/3" v-if="data != null">
          <div class="flex justify-between" v-for="(data,index) in data" :key="data.index">
            <h3>{{data}}</h3>
            <button @click="deleteBook(index)">{{index}}</button>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      data:[]
    }
  },
  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },
  methods: {

    onInit (promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    resetValidationState () {
      this.isValid = undefined
    },

    deleteBook(index){  
      this.data.splice(index,1)
    },

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
        // pretend it's taking really long
        // await this.timeout(1000)[./]
      var data = await this.$axios.$get(`http://localhost:4000/api/book/${content}`)
      if (data != null){
        this.data.push(data.name)
        this.isValid = true
      }else{
        this.isValid = false
      }
      // this.isValid = content.startsWith('http')

      // some more delay, so users have time to read the message
      // await this.timeout(1000)

      this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>