import * as Alexa from 'alexa-sdk';
import { HelpUtterance as Utterance } from '../utterances/help-utterance';
import { IntentBase } from './intent-base';

/**
 * ヘルプ インテントクラス
 */
export class HelpIntent extends IntentBase<Utterance> {
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
      .speak(result.speech)
      .listen(result.repromptSpeech);

    // レスポンス生成
    context.emit(':responseReady');
  }
}
