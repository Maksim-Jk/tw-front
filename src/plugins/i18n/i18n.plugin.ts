import { createI18n } from 'vue-i18n';
import ru from '@/i18n/ru.json';
import en from '@/i18n/en.json';
import type { IAppPlugin } from '@/helpers/register-plugin/IAppPlugin.interface';
import type { App } from 'vue';

const messages = {
  ru,
  en,
};

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  silentFallbackWarn: true,
  allowComposition: true,
  silentTranslationWarn: true,
  messages,
});

export class I18nPlugin implements IAppPlugin {
  register = (app: App): void => {
    app.use(i18n);
  };
}
