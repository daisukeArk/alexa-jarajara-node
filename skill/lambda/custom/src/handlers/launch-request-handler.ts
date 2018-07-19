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
  canHandle(handlerInput: Ask.HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  /**
   * ハンドラ実行
   * @param handlerInput ハンドラ
   */
  handle(handlerInput: Ask.HandlerInput) {
    // 発話取得
    const speechOutput = createUtterance(Utterance).respond();

    // レスポンス
    return handlerInput.responseBuilder
      .speak(speechOutput.speech)
      .reprompt(speechOutput.repromptSpeech)
      .getResponse();
  }
};
