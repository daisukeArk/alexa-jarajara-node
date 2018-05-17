import * as Intents from '../intents';
import * as Utterances from '../utterances';
import { ServiceFactory } from './service-factory';

/**
 * インテントファクトリクラス
 */
export class IntentFactory {
  /**
   * 点数計算 インテント
   */
  private static _calculatePointIntent: Intents.CalculatePointIntent;

  /**
   * ヘルプ インテント
   */
  private static _helpIntent: Intents.HelpIntent;

  /**
   * 停止 インテント
   */
  private static _stopIntent: Intents.StopIntent;

  /**
   * 未ハンドル インテント
   */
  private static _unHandledIntent: Intents.UnHandledIntent;

  /**
   * コンストラクタ
   */
  private constructor() {
  }

  /**
   * 点数計算 インテントインスタンス
   */
  public static get CalculatePointIntent(): Intents.CalculatePointIntent {
    if (!this._calculatePointIntent) {
      this._calculatePointIntent = new Intents.CalculatePointIntent(
        ServiceFactory.CalculateService,
        new Utterances.CalculatePointUtterance()
      );
    }
    return this._calculatePointIntent;
  }

  /**
   * ヘルプ インテントインスタンス
   */
  public static get HelpIntent(): Intents.HelpIntent {
    if (!this._helpIntent) {
      this._helpIntent = new Intents.HelpIntent(new Utterances.HelpUtterance());
    }
    return this._helpIntent;
  }

  /**
   * 停止 インテントインスタンス
   */
  public static get StopIntent(): Intents.StopIntent {
    if (!this._stopIntent) {
      this._stopIntent = new Intents.StopIntent(new Utterances.StopUtterance());
    }
    return this._stopIntent;
  }

  /**
   * 未ハンドル インテントインスタンス
   */
  public static get UnHandledIntent(): Intents.UnHandledIntent {
    if (!this._unHandledIntent) {
      this._unHandledIntent = new Intents.UnHandledIntent(new Utterances.UnHandledUtterance());
    }
    return this._unHandledIntent;
  }
}
