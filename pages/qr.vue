<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <div class="w-1/2">
      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
        <div v-show="showScanConfirmation" class="scan-confirmation">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- <img :src="$withBase('/checkmark.svg')" alt="Checkmark" width="128px" /> -->
        </div>
      </qrcode-stream>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      camera: 'auto',
      result: null,
      showScanConfirmation: false
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
      this.result = content

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