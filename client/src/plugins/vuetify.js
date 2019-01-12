import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.blue.lighten2,  // #64B5F6
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.blue.base,       // #2196F3
    success: colors.green.accent2,  // #69F0AE
    danger: colors.red.accent2,     // #FF5252
    warning: colors.yellow.accent2  // #FFFF00
  }
})
