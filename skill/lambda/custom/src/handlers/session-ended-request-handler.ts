import * as Ask from 'ask-sdk-core';

/**
 * セッション終了リクエストハンドラ
 */
export const SessionEndedRequestHandler: Ask.RequestHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   */
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  /**
   * ハンドラ実行
   * @param handlerInput ハンドラ
   */
  handle(handlerInput) {
    // レスポンス
    return handlerInput.responseBuilder.getResponse();
  }
};
