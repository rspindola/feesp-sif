import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  setInteractionMode,
} from 'vee-validate'
import {
  required,
  email,
  confirmed,
  max,
  min,
  regex,
  between,
} from 'vee-validate/dist/rules'
import CpfValidate from './validators/rules/cpf'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Campo Obrigatório',
})

extend('email', {
  ...email,
  message: 'E-mail invalido',
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_}s não coindidem',
})

extend('regex', {
  ...regex,
  message: 'CPF Inválido',
})

extend('min', {
  ...min,
})

extend('max', {
  ...max,
})

extend('date_between', {
  ...between,
})

extend('cpf', {
  message: 'Cpf inválido',
  validate: (value) => {
    return CpfValidate(value)
  },
})

extend('between', {
  params: ['min', 'max'],
  validate(value, { min, max }) {
    return value >= min && value <= max
  },
  message: 'This field value must be between {min} and {max}',
})
