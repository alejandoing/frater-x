import { ERROR, AUTH_ERROR_MSG, AUTH_DESACTIVED_MSG, KEYUP,
  SUBMIT, INVALID_EMAIL_MSG, REQUIRED_EMAIL_MSG, REQUIRED_PASSWORD_MSG,
  SUFFIX_UP, SUFFIX_ME, SUFFIX_IC, STRING, HIDDEN
} from './constants'

export const buildAlert = {
  data: () => ({
    alert: {
      _self: false,
      type: null,
      message: null
    }
  }),

  methods: {
    feedBack (context, object) {
      const contexts = {
        AUTH: () => {
          const status = {
            ACTIVE: () => true,
            DESACTIVED: () => {
              this.alert._self = true
              this.alert.message = AUTH_DESACTIVED_MSG
              this.alert.type = ERROR
              return false
            }
          }

          try {
            return status[object.status]()
          } catch (e) {
            this.alert._self = true
            this.alert.message = AUTH_ERROR_MSG
            this.alert.type = ERROR
            return false
          }
        }
      }

      return contexts[context]()
    }
  }
}

export const submitKey = {
  created () {
    addEventListener(KEYUP, (event) => {
      const $submit = document.getElementById(SUBMIT)
      event.preventDefault()
      if (event.keyCode === 13) $submit.click()
    })
  }
}

export const customValidations = {
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push(INVALID_EMAIL_MSG)
      !this.$v.email.required && errors.push(REQUIRED_EMAIL_MSG)

      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(REQUIRED_PASSWORD_MSG)
      return errors
    }
  }
}

export const loader = {
  data: () => ({
    loader: null,
    loading: false
  }),
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 4500)

      this.loader = null
    }
  }
}

export const dynamicMixin = {
  methods: {
    dynamicID (string, ref, suffix = false) {
      return suffix ? `${string}-${ref}-${suffix}` : `${string}-${ref}`
    }
  }
}

export const uploadMixin = {
  data: () => ({
    suffixUp: SUFFIX_UP,
    suffixMe: SUFFIX_ME,
    suffixIc: SUFFIX_IC,
    background: null,
    selectedFiles: {}
  }),
  methods: {
    uploadClick (ID) {
      const $button = document.getElementById(ID)
      $button.click()
    },
    writeFile (event, element, type = STRING) {
      const $input = document.getElementById(element)
      const $button = document.getElementById(`${element}-${this.suffixUp}`)
      
      const $media = document.getElementById(`${element}-${this.suffixMe}`)
      const $icon = document.getElementById(`${element}-${this.suffixIc}`)
      
      if (type !== STRING) {
        const input = event.target
        const reader = new FileReader()
        reader.onload = function () {
          $media.classList.remove(HIDDEN)
          $icon.classList.add(HIDDEN)
          $media.src = reader.result
        }
        reader.readAsDataURL(input.files[0])
      } else {
        $button.innerHTML = $input.files[0].name
      }

      this[element] = event.srcElement.files[0]
      this.selectedFiles[element] = true
    }
  }
}
