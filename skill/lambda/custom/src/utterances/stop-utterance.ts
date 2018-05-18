import * as Ask from 'ask-sdk-core';
import { IStopSpeechOutput as ISpeechOutput } from './domains/stop-speech-output';
import { UtteranceBase } from './utterance-base';

/**
 * 停止 発話クラス
 */
export class StopUtterance extends UtteranceBase {
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
      speech: requestAttributes.t('GOOD_BYE')
    };
  }
}
