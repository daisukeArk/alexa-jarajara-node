import { IStopSpeechOutput as ISpeechOutput } from './domains/stop-speech-output';
import { ILanguageStrings } from './language-strings';
import { UtteranceBase } from './utterance-base';
/**
 * 停止 発話クラス
 */
export class StopUtterance extends UtteranceBase {
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
      speech: this.languageStrings.ja.GOOD_BYE
    };
  }
}
