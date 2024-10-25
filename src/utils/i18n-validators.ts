import * as validators from '@vuelidate/validators'
import { i18n } from '@/locales/i18n'

const { createI18nMessage } = validators

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

export const required = withI18nMessage(validators.required)
export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
})
export const maxLength = withI18nMessage(validators.maxLength, {
  withArguments: true,
})
export const minValue = withI18nMessage(validators.minValue, {
  withArguments: true,
})
export const numeric = withI18nMessage(validators.numeric)
export const email = withI18nMessage(validators.email)

export const phoneValidator = withI18nMessage((value: string) => {
  const phoneRegex =
    /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
  return phoneRegex.test(value)
})

export const dateInPast = withI18nMessage((value: string) => {
  const today = new Date()
  const inputDate = new Date(value)
  return inputDate <= today
})
