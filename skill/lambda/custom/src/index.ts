import * as Alexa from 'alexa-sdk';
import * as Handlers from './handlers';
import { languageStrings } from './utterances/language-strings';

/**
 * エントリポイント
 * @param event イベント
 * @param context コンテキスト
 * @param callback コールバック
 */
export const handler = (
  event: Alexa.RequestBody<any>,
  context: Alexa.Context,
  callback: (err: any, response: any) => void
) => {

  const alexa = Alexa.handler(event, context, callback);
  if (process.env.APP_ID) {
    alexa.appId = process.env.APP_ID;
  }
  alexa.resources = languageStrings;
  alexa.registerHandlers(Handlers.DefaultHandler);
  alexa.execute();
};
