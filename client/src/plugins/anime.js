import Vue from 'vue'
import anime from 'animejs'

const animate = {
  install (Vue, options) {
    Vue.prototype.$anime = anime
  }
}

Vue.use(animate)
