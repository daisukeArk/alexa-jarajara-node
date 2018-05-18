import * as Ask from 'ask-sdk-core';
import * as Util from 'util';
import { createUtterance } from '../factories/utterance-factory';
import { LoggerFactory } from '../helpers/logger-factory';
import { ErrorUtterance as Utterance } from '../utterances/error-utterance';

/**
 * エラーハンドラ
 */
export const ErrorHandler: Ask.ErrorHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   * @param error エラー
   */
  canHandle(handlerInput: Ask.HandlerInput, error: Error) {
    return true;
  },
  /**
   * ハンドラ実行
   * @param handlerInput ハンドラ
   * @param error エラー
   */
  handle(handlerInput: Ask.HandlerInput, error: Error) {
    // 発話取得
    const speechOutput = createUtterance(Utterance).respond(handlerInput);

    // ログ出力
    LoggerFactory.instance.error(String(error.stack));

    // レスポンス
    return handlerInput.responseBuilder
      .speak(speechOutput.speech)
      .reprompt(speechOutput.repromptSpeech)
      .getResponse();
  }
};
