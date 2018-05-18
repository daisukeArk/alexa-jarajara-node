import { UtteranceBase } from '../utterances/utterance-base';

/**
 * インスタンス作成
 */
export function createUtterance<TUtterance extends UtteranceBase>(
  utterance: new () => TUtterance
): TUtterance {
  return new utterance();
}
