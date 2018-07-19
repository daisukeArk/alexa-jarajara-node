import { ILanguageStrings, languageStrings } from '../utterances/language-strings';
import { UtteranceBase } from '../utterances/utterance-base';

/**
 * インスタンス作成
 */
export function createUtterance<TUtterance extends UtteranceBase>(
  utterance: new (strings: ILanguageStrings) => TUtterance
): TUtterance {
  return new utterance(languageStrings);
}
