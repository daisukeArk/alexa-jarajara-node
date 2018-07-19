import { ILaunchRequestSpeechOutput } from './domains/launch-request-speech-output';
import { ILanguageStrings } from './language-strings';
import { UtteranceBase } from './utterance-base';

/**
 * 起動リクエスト 発話クラス
 */
export class LaunchRequestUtterance extends UtteranceBase {
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
  public respond(): ILaunchRequestSpeechOutput {
    return {
      speech: this.languageStrings.ja.WELCOME,
      repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
    };
  }
}
