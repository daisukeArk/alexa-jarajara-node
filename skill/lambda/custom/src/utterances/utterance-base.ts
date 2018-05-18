import * as Ask from 'ask-sdk-core';
import { ISpeechOutputBase } from './domains/speech-output-base';

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
   * @param handlerInput ハンドラコンテキスト
   * @param args 引数
   */
  public abstract respond(handlerInput: Ask.HandlerInput, ...args: any[]): ISpeechOutputBase;
}
