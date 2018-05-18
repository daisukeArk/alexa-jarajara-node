import * as Ask from 'ask-sdk-core';
import { ILaunchRequestSpeechOutput } from './domains/launch-request-speech-output';
import { UtteranceBase } from './utterance-base';

/**
 * 起動リクエスト 発話クラス
 */
export class LaunchRequestUtterance extends UtteranceBase {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /**
   * 発話内容取得
   * @param handlerInput ハンドラコンテキスト
   * @returns 発話内容
   */
  public respond(handlerInput: Ask.HandlerInput): ILaunchRequestSpeechOutput {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return {
      speech: requestAttributes.t('WELCOME'),
      repromptSpeech: requestAttributes.t('HELP_MESSAGE')
    };
  }
}
