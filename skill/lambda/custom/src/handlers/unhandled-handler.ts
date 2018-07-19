import * as Ask from 'ask-sdk-core';
import { createUtterance } from '../factories/utterance-factory';
import { UnhandledUtterance as Utterance } from '../utterances/unhandled-utterance';

/**
 * 未ハンドラ インテントハンドラ
 */
export const UnhandledHandler: Ask.RequestHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   */
  canHandle(handlerInput: Ask.HandlerInput) {
    return true;
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
