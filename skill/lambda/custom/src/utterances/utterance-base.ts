import * as Alexa from 'alexa-sdk';
import { IUtteranceResult } from '../domains/utterance-result';

/**
 * 発話基底クラス
 */
export abstract class UtteranceBase {
  /**
   * コンストラクタ
   */
  constructor() {
  }

  /**
   * レスポンス生成
   * @param context Alexaハンドラコンテキスト
   * @param args 引数
   */
  public abstract respond(context: Alexa.Handler<any>, ...args: any[]): IUtteranceResult;
}
