import {
  Form as veeForm,
  Field as veeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
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
  confirmed,
  not_one_of as nof
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
    defineRule('requiredValueID', required)
    defineRule('min', min)
    defineRule('alphaSpaces', alpha_spaces)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('numeric', numeric)
    defineRule('alphaNum', alpha_num)
    defineRule('nof', nof)
    // custom specifict rules
    defineRule('nof-country', nof)
    defineRule('tosreq', required)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          requiredValue: `Come on field this ${ctx.field}!`,
          nof: `You are not aloowed to you this shit value ${ctx.value}`,
          'nof-country': `Iran?!! 😂`,
          confirmed: "Password dosen't match idiot!",
          tosreq: `Check it b****`,
          requiredValueID: 'Pls input your Telegram ID'
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true
    })
  }
}
