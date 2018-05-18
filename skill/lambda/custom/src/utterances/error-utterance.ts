import * as Alexa from 'alexa-sdk';
import { IUtteranceResult } from '../domains/utterance-result';
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
   * @param context ハンドラコンテキスト
   * @returns 発話結果
   */
  public respond(context: Alexa.Handler<any>): IUtteranceResult {
    return {
      speech: <any>context.t('UNHANDLED_MESSAGE') + <any>context.t('HELP_MESSAGE'),
      repromptSpeech: <any>context.t('HELP_MESSAGE')
    };
  }
}
