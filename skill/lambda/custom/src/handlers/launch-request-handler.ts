import * as Ask from 'ask-sdk-core';
import { createUtterance } from '../factories/utterance-factory';
import { LaunchRequestUtterance as Utterance } from '../utterances/launch-request-utterance';

/**
 * 起動リクエストハンドラ
 */
export const LaunchRequestHandler: Ask.RequestHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   */
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  /**
   * ハンドラ実行
   * @param handlerInput ハンドラ
   */
  handle(handlerInput) {
    // 発話取得
    const speechOutput = createUtterance(Utterance).respond(handlerInput);

    // レスポンス
    return handlerInput.responseBuilder
      .speak(speechOutput.speech)
      .reprompt(speechOutput.repromptSpeech)
      .getResponse();
  }
};
