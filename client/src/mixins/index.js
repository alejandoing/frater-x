import { INVALID_EMAIL_MSG, REQUIRED_MSG, STRING, IMAGE, HIDDEN, OPTION_IMAGE, OPTIONS_IND
} from './constants'

export const swalMixin = {
  methods: {
    async confirmationSwal (title, text) {
      await this.$swal({
        title,
        text,
        icon: 'warning',
        dangerMode: true,
        buttons: {
          cancel: {
            text: 'Cancelar',
            value: false,
            closeModal: true,
            visible: true
          },
          confirm: {
            text: 'Estoy Seguro',
            value: true,
            closeModal: true
          }
        }
      })
    },
    feedBackSwal (context, object) {
      this.loader = null
      this.loading = false
      
      const contexts = {
        AUTH: () => {
          const status = {
            ACTIVE: () => {
              this.$swal('¡Bienvenido a NPSFrater-X!', 'Credenciales correctas', 'success')
              return true
            },
            DESACTIVED: () => {
              this.$swal('¡Advertencia!', 'El usuario ha sido desactivado. Contacte a Administración', 'warning')
              return false
            }
          }

          try {
            return status[object.status]()
          } catch (e) {
            this.$swal('¡Algo ha salido mal!', 'Credenciales incorrectas', 'error')
            return false
          }
        }
      }

      return contexts[context]()
    }
  }
}

export const customValidationMixin = {
  computed: {
    emailErrors () {
      const errors = []
      const required = this.genericRequired('email')
      
      if (required.length) errors.push(required)
      !this.$v.email.email && errors.push(INVALID_EMAIL_MSG)
      return errors
    },
    flowErrors () {
      return this.genericRequired('level')
    },
    passwordErrors () {
      return this.genericRequired('password')
    },
    questionErrors () {
      return this.genericRequired('question')
    },
    localErrors () {
      return this.genericRequired('local')
    },
    zoneErrors () {
      return this.genericRequired('zone')
    }
  },
  methods: {
    genericRequired (element) {
      const errors = []
      if (!this.$v[element].$dirty) return errors
      !this.$v[element].required && errors.push(REQUIRED_MSG)
      return errors
    }
  }
}

export const loaderMixin = {
  data: () => ({
    loader: null,
    loading: false
  }),
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
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
        title: `Flujo ${parseInt(level) + 1}`,
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
    IMAGE,
    STRING,
    OPTION_IMAGE,
    OPTIONS_IND
  }),
  methods: {
    uploadClick (ID) {
      const $element = this.getElementById(ID)
      $element.value = null
      $element.click()
    },
    writeFile (event, type = STRING, context = null) {
      const { selectedFiles, level } = this
      const reader = new FileReader()
      
      if (type !== STRING) {
        reader.onload = () => {
          const [face, index] = context
          this.level.faces[face].options[index] = event.srcElement.files[0]
          this.$set(selectedFiles[face], index, reader.result)
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
