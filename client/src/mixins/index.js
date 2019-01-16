import { ERROR, AUTH_ERROR_MSG, AUTH_DESACTIVED_MSG, KEYUP,
  SUBMIT, INVALID_EMAIL_MSG, REQUIRED_EMAIL_MSG, REQUIRED_PASSWORD_MSG,
  SUFFIX_UP, SUFFIX_ME, SUFFIX_IC, STRING, IMAGE, HIDDEN, OPTION_IMAGE, OPTIONS_IND
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
    dynamicFlow (level) {
      return {
        faces: {
          excellent: { question: 'Nos alegra saberlo, ¿qué servicio utilizaste?', options: [] },
          good: { question: 'Nos alegra saberlo, ¿qué servicio utilizaste?', options: [] },
          regular: { question: 'Nos entristece saberlo, ¿qué servicio utilizaste?', options: [] },
          bad: { question: 'Nos entristece saberlo, ¿qué servicio utilizaste?', options: [] }
        },
        title: `Flujo ${(level + 1)}`,
        key: level
      }
    }
  }
}

export const documentMixin = {
  methods: {
    dynamicID (root, suffixes = []) {
      const collection = suffixes.map(suffix => `${suffix}-`).join('')
      return `${root}-${collection.substring(0, collection.length - 1)}`
    },
    getElementById (ID, dynamic = false) {
      return dynamic ? document.getElementById(this.dynamicID(ID, dynamic)) : document.getElementById(ID)
    }
  }
}

export const uploadMixin = {
  data: () => ({
    SUFFIX_UP,
    SUFFIX_ME,
    SUFFIX_IC,
    IMAGE,
    STRING,
    OPTION_IMAGE,
    OPTIONS_IND
  }),
  methods: {
    uploadClick (ID) {
      const $element = this.getElementById(ID)
      $element.click()
    },
    writeFile (event, type = STRING, context = null) {
      const { getElementById, hiddenToggle, level } = this
      const rootID = event.srcElement.id
      const reader = new FileReader()
      
      if (type !== STRING) {
        const $media = getElementById(rootID, [SUFFIX_ME])
        const $icon = getElementById(rootID, [SUFFIX_IC])

        reader.onload = () => {
          const [face, index] = context
          hiddenToggle($media, $icon)
          $media.src = reader.result
          this.level.faces[face].options[index - 1] = event.srcElement.files[0]
          this.$emit('update-flow', level)
        }

        reader.readAsDataURL(event.target.files[0])
      } else {
        reader.onload = () => {
          this.background = event.srcElement.files[0]
          this.background.src = reader.result
        }

        reader.readAsDataURL(event.target.files[0])
      }
    },
    hiddenToggle ($elementR, $elementA) {
      $elementR.classList.remove(HIDDEN)
      $elementA.classList.add(HIDDEN)
    }
  },
  mixins: [documentMixin]
}
