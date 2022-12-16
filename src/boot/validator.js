import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import en from 'vee-validate/dist/locale/en'

const config = {
  locale: 'en',
  inject: false
}

Validator.localize('en', en)
Vue.use(VeeValidate, config)

const strongPass = 'strong_password'
VeeValidate.Validator.extend(strongPass, {
  getMessage: field => `
  The password must contain at least: 1 capital letter, 1 lower case letter, 1 number and a special character (eg _ &? Etc.)`,
  validate: value => {
    var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')
    return strongRegex.test(value)
  }
})
const maxDimensionsRule = {
  getMessage (field, [width, height], data) {
    return (data && data.message) || `The ${field} field must be UP TO ${width} pixels by ${height} pixels.`
  },
  validate (files, [width, height]) {
    const validateImage = (file, width, height) => {
      const URL = window.URL || window.webkitURL
      return new Promise(resolve => {
        const image = new Image()
        image.onerror = () => resolve({ valid: false })
        image.onload = () => resolve({
          valid: image.width <= Number(width) && image.height <= Number(height) // only change from official rule
        })

        image.src = URL.createObjectURL(file)
      })
    }
    const list = []
    for (let i = 0; i < files.length; i++) {
      // if file is not an image, reject.
      if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, width, height)))
  }
}
VeeValidate.Validator.extend('maxdimensions', maxDimensionsRule)
