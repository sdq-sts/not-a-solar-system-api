<template>
  <v-card>
    <v-container>
      <v-layout>
        <input
          tabindex="-1"
          @change="previewImg"
          type="file"
          accept="image/*"
          ref="uploadImg"
          style="display: none"
        />
        <v-flex>
          <div class="img-wrapper">
            <div class="img-wrapper__content wrapper-content">
              <img
                ref="img"
                :src="avatar"
                alt="avatar"
                class="wrapper-content__img"
              >
            </div>
          </div>
        </v-flex>

      </v-layout>

      <v-layout justify-center class="mt-3">
        <v-btn
          color="primary"
          @click="uploadImg"
        >{{ text.upload }}</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    default: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false
    }
  },

  data: () => ({
    file: '',
    text: {
      upload: 'upload'
    }
  }),

  computed: {
    avatar () {
      return this.img || this.default
    }
  },

  methods: {
    previewImg (e) {
      if (e.target.files.length) {
        const fileSrc = URL.createObjectURL(e.target.files[0])
        this.file = e.target.files[0]
        this.$refs.img.src = fileSrc
        this.$emit('input', this.file)
      }
    },
    uploadImg () {
      this.$refs.uploadImg.click()
    },
  }
}
</script>

<style>
.img-wrapper {
  position: relative;
  width: 100%;
  height: auto;
}
.img-wrapper:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.img-wrapper__content {
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.wrapper-content__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
