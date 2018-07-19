import * as Ask from 'ask-sdk-core';
import { IErrorSpeechOutput as ISpeechOutput } from './domains/error-speech-output';
import { ILanguageStrings } from './language-strings';
import { UtteranceBase } from './utterance-base';

/**
 * 未ハンドル 発話クラス
 */
export class ErrorUtterance extends UtteranceBase {
  /**
   * コンストラクタ
   * @param languageStrings 発話セット
   */
  constructor(languageStrings: ILanguageStrings) {
    super(languageStrings);
  }

  /**
   * 発話内容取得
   * @returns 発話内容
   */
  public respond(): ISpeechOutput {
    return {
      speech: this.languageStrings.ja.UNHANDLED_MESSAGE + this.languageStrings.ja.HELP_MESSAGE,
      repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
    };
  }
}
