import * as Ask from 'ask-sdk-core';
import { IHelpSpeechOutput as ISpeechOutput } from './domains/help-speech-output';
import { UtteranceBase } from './utterance-base';

/**
 * ヘルプ 発話クラス
 */
export class HelpUtterance extends UtteranceBase {
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
      speech: requestAttributes.t('HELP_MESSAGE') + requestAttributes.t('HELP_FU_NUMBER') + requestAttributes.t('HELP_HAN_NUMBER'),
      repromptSpeech: requestAttributes.t('HELP_MESSAGE')
    };
  }
}
