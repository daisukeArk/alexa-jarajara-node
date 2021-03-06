import { IHelpSpeechOutput as ISpeechOutput } from './domains/help-speech-output';
import { ILanguageStrings } from './language-strings';
import { UtteranceBase } from './utterance-base';

/**
 * ヘルプ 発話クラス
 */
export class HelpUtterance extends UtteranceBase {
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
      speech: this.languageStrings.ja.HELP_MESSAGE + this.languageStrings.ja.HELP_FU_NUMBER + this.languageStrings.ja.HELP_HAN_NUMBER,
      repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
    };
  }
}
