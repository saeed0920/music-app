import { Form as veeForm, Field as veeField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
export default {
  install(app) {
    app.component('veeForm', veeForm)
    app.component('veeField', veeField)

    defineRule('requiredValue', required)
  }
}
