import * as Ask from 'ask-sdk-core';
import { createUtterance } from '../factories/utterance-factory';
import { StopUtterance as Utterance } from '../utterances/stop-utterance';

/**
 * 停止 インテントハンドラ
 */
export const CancelAndStopIntentHandler: Ask.RequestHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   */
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      )
    );
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
      .getResponse();
  }
};
