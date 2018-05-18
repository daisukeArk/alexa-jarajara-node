import * as Ask from 'ask-sdk-core';
import * as i18n from 'i18next';
import * as sprintf from 'i18next-sprintf-postprocessor';
import { languageStrings } from '../utterances/language-strings';

export const CommonInterceptor: Ask.RequestInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = (key: string | string[], options?: i18n.TranslationOptions<object> | undefined) => {
      return localizationClient.t(key, options);
    };
  }
};
