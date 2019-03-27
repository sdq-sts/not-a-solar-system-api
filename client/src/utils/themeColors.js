import colors from 'vuetify/es5/util/colors'

const darkThemeColors = {
  primary: colors.pink.darken2,   // #616161
  secondary: colors.grey.darken2, // #616161
  accent: colors.blue.base,       // #2196F3
  success: colors.green.lighten1, // #9CCC65
  warning: colors.yellow.base,    // #FFEB3B
  error: colors.red.accent2,      // #FF5252
  danger: colors.red.accent2      // #FF5252
}

const lightThemeColors = {
  primary: colors.blue.lighten2,  // #64B5F6
  secondary: colors.red.lighten4, // #FFCDD2
  accent: colors.blue.base,       // #2196F3
  success: colors.green.accent2,  // #69F0AE
  warning: colors.yellow.accent2, // #FFFF00
  error: colors.red.accent2,      // #FF5252
  danger: colors.red.accent2      // #FF5252
}

export { darkThemeColors, lightThemeColors }
