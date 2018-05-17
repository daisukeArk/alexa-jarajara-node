import * as Alexa from 'alexa-sdk';
import { IUtteranceResult } from '../domains/utterance-result';
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
   * @param context ハンドラコンテキスト
   * @returns 発話結果
   */
  public respond(context: Alexa.Handler<any>): IUtteranceResult {
    return {
      speech: <any>context.t('HELP_MESSAGE') + <any>context.t('HELP_FU_NUMBER') + <any>context.t('HELP_HAN_NUMBER'),
      repromptSpeech: <any>context.t('HELP_MESSAGE')
    };
  }
}
