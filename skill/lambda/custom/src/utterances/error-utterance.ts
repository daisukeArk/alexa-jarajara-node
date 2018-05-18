import * as Ask from 'ask-sdk-core';
import { IUnhandledSpeechOutput as ISpeechOutput } from './domains/unhandled-speech-output';
import { UtteranceBase } from './utterance-base';

/**
 * 未ハンドル 発話クラス
 */
export class UnHandledUtterance extends UtteranceBase {
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
  public respond(handlerInput: Ask.HandlerInput): ISpeechOutput {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return {
      speech: requestAttributes.t('UNHANDLED_MESSAGE') + requestAttributes.t('HELP_MESSAGE'),
      repromptSpeech: requestAttributes.t('HELP_MESSAGE')
    };
  }
}
