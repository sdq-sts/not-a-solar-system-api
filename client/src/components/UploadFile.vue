<template>
  <v-card fill-height class="fill-height upload-card">
    <input @change="previewImg" type="file" accept="image/*" ref="uploadImg" style="display: none">
    <div class="img-wrapper">
      <img ref="img" :src="imgUrl || defaultImgUrl" alt="avatar" class="img-wrapper__img">
    </div>
    <v-btn color="primary" @click="uploadImg">UPLOAD</v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    defaultImgUrl: {
      type: String,
      required: false
    }
  },
  data: () => ({
    file: ''
  }),
  methods: {
    uploadImg () {
      this.$refs.uploadImg.click()
    },
    previewImg (e) {
      if (e.target.files.length) {
        const fileSrc = URL.createObjectURL(e.target.files[0])
        this.file = e.target.files[0]
        this.$refs.img.src = fileSrc
        this.$emit('fileAdded', this.file)
      }
    }
  }
}
</script>

<style scoped>
.upload-card {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.img-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.img-wrapper__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>
