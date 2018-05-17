import * as Alexa from 'alexa-sdk';
import { IntentFactory } from '../factories/intent-factory';
import * as HandlerMethodTypes from './handler-method-type';

/**
 * ハンドラ
 */
export const handler: HandlerMethodTypes.defaultHandlerType = {
  /**
   * 起動リクエスト インテント
   * @param this ハンドラコンテキスト
   */
  LaunchRequest(this: Alexa.Handler<any>): void {
    // レスポンス設定
    this.response
      .speak(<any>this.t('WELCOME'))
      .listen(<any>this.t('HELP_MESSAGE'));

    // レスポンス生成
    this.emit(':responseReady');
  },
  /**
   * 点数計算 インテント
   * @param this ハンドラコンテキスト
   */
  CalculatePointIntent(this: Alexa.Handler<any>): void {
    IntentFactory.CalculatePointIntent.execute(this);
  },
  /**
   * ヘルプ インテント
   * @param this ハンドラコンテキスト
   */
  'AMAZON.HelpIntent'(this: Alexa.Handler<any>): void {
    IntentFactory.HelpIntent.execute(this);
  },
  /**
   * キャンセル インテント
   * @param this ハンドラコンテキスト
   */
  'AMAZON.CancelIntent'(this: Alexa.Handler<any>): void {
    IntentFactory.StopIntent.execute(this);
  },
  /**
   * 停止 インテント
   * @param this ハンドラコンテキスト
   */
  'AMAZON.StopIntent'(this: Alexa.Handler<any>): void {
    IntentFactory.StopIntent.execute(this);
  },
  /**
   * 未ハンドル インテント
   * @param this ハンドラコンテキスト
   */
  Unhandled(this: Alexa.Handler<any>): void {
    IntentFactory.UnHandledIntent.execute(this);
  }
};
