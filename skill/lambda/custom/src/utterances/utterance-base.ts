import { ISpeechOutputBase } from './domains/speech-output-base';
import { ILanguageStrings } from './language-strings';

/**
 * 発話基底クラス
 */
export abstract class UtteranceBase {
  protected languageStrings: ILanguageStrings;

  /**
   * コンストラクタ
   */
  constructor(languageStrings: ILanguageStrings) {
    this.languageStrings = languageStrings;
  }

  /**
   * レスポンス生成
   * @param handlerInput ハンドラコンテキスト
   * @param args 引数
   */
  public abstract respond(...args: any[]): ISpeechOutputBase;
}
