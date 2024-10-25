import { createI18n } from 'vue-i18n'

const messages = {
  ru: {
    home: 'Главная',
    about: 'О нас',
    toggleLanguage: 'Сменить язык',
    validations: {
      required: 'Это поле обязательно для заполнения',
      minLength: 'Минимальная длина: {min} символов',
      maxLength: 'Максимальная длина: {max} символов',
      minValue: 'Минимальное значение: {min}',
      numeric: 'Введите числовое значение',
      email: 'Введите корректный email адрес',
      phoneValidator: 'Введите корректный российский номер телефона',
      dateInPast: 'Дата не может быть в будущем',
    },
    form: {
      tabs: {
        personalInfo: {
          title: 'Персональная информация',
          content: 'Введите вашу личную информацию',
        },
        jobInfo: {
          title: 'Информация о работе',
          content: 'Введите информацию о вашей работе',
        },
      },
      fields: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        phone: 'Телефон',
        email: 'Email',
        jobTitle: 'Должность',
        company: 'Компания',
        startDate: 'Дата начала работы',
        location: 'Местоположение',
        salary: 'Зарплата',
        responsibilities: 'Обязанности',
      },
      placeholders: {
        firstName: 'Введите имя',
        lastName: 'Введите фамилию',
        phone: 'Введите номер телефона',
        email: 'Введите email',
        jobTitle: 'Введите должность',
        company: 'Введите название компании',
        startDate: 'Выберите дату начала работы',
        location: 'Введите местоположение',
        salary: 'Введите зарплату',
        responsibilities: 'Опишите обязанности',
      },
      submit: 'Отправить',
      submitSuccessTitle: 'Успешно отправлено',
      submitSuccessMessage: 'Ваша форма была успешно отправлена.',
      submitErrorTitle: 'Ошибка отправки',
      submitErrorMessage: 'Пожалуйста, проверьте форму и исправьте ошибки.',
    },
  },
  en: {
    home: 'Home',
    about: 'About',
    toggleLanguage: 'Change Language',
    validations: {
      required: 'This field is required',
      minLength: 'Minimum length: {min} characters',
      maxLength: 'Maximum length: {max} characters',
      minValue: 'Minimum value: {min}',
      numeric: 'Please enter a numeric value',
      email: 'Please enter a valid email address',
      phoneValidator: 'Please enter a valid Russian phone number',
      dateInPast: 'Date cannot be in the future',
    },
    form: {
      tabs: {
        personalInfo: {
          title: 'Personal Information',
          content: 'Enter your personal information',
        },
        jobInfo: {
          title: 'Job Information',
          content: 'Enter your job information',
        },
      },
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        phone: 'Phone',
        email: 'Email',
        jobTitle: 'Job Title',
        company: 'Company',
        startDate: 'Start Date',
        location: 'Location',
        salary: 'Salary',
        responsibilities: 'Responsibilities',
      },
      placeholders: {
        firstName: 'Enter first name',
        lastName: 'Enter last name',
        phone: 'Enter phone number',
        email: 'Enter email',
        jobTitle: 'Enter job title',
        company: 'Enter company name',
        startDate: 'Choose start date',
        location: 'Enter location',
        salary: 'Enter salary',
        responsibilities: 'Describe responsibilities',
      },
      submit: 'Submit',
      submitSuccessTitle: 'Successfully Submitted',
      submitSuccessMessage: 'Your form has been successfully submitted.',
      submitErrorTitle: 'Submission Error',
      submitErrorMessage: 'Please check the form and correct the errors.',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'ru', // установите начальный язык здесь
  fallbackLocale: 'en',
  messages,
})
