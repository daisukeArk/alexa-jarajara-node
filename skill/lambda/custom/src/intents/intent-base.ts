import * as Alexa from 'alexa-sdk';
import { UtteranceBase } from '../utterances/utterance-base';

/**
 * インテント基底クラス
 */
export abstract class IntentBase<TUtterance extends UtteranceBase> {
  /**
   * 発話クラス
   */
  protected utterance: TUtterance;

  /**
   * コンストラクタ
   * @param utterance 発話クラス
   */
  constructor(utterance: TUtterance) {
    this.utterance = utterance;
  }

  /**
   * アクション
   * @param context ハンドラコンテキスト
   */
  public abstract execute(context: Alexa.Handler<any>): void;
}
