import { Form as veeForm, Field as veeField, defineRule, ErrorMessage } from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces,
  email,
  numeric,
  alpha_num,
  min_value,
  max_value,
  confirmed
} from '@vee-validate/rules'
export default {
  install(app) {
    // add components in library
    app.component('veeForm', veeForm)
    app.component('veeField', veeField)
    app.component('ErrorMessage', ErrorMessage)

    // register rules
    defineRule('confirmed', confirmed)
    defineRule('minValue', min_value)
    defineRule('maxValue', max_value)
    defineRule('requiredValue', required)
    defineRule('min', min)
    defineRule('alphaSpaces', alpha_spaces)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('numeric', numeric)
    defineRule('alphaNum', alpha_num)
  }
}
