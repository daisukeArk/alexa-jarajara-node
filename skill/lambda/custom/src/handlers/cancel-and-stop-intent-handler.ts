import * as Alexa from 'alexa-sdk';
import { StopUtterance as Utterance } from '../utterances/stop-utterance';
import { IntentBase } from './intent-base';

/**
 * 停止 インテントクラス
 */
export class StopIntent extends IntentBase<Utterance> {
  /**
   * コンストラクタ
   */
  constructor(utterance: Utterance) {
    super(utterance);
  }

  /**
   * アクション
   * @param context ハンドラコンテキスト
   */
  public execute(context: Alexa.Handler<any>) {
    // 発話取得
    const result = this.utterance.respond(context);

    // レスポンス設定
    context.response
      .speak(result.speech);

    // レスポンス生成
    context.emit(':responseReady');
  }
}
