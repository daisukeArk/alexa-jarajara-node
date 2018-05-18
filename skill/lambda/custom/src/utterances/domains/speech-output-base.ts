/**
 * 発話結果
 */
export interface IUtteranceResult {
  /**
   * 初回の発話
   */
  speech: any;

  /**
   * 追加の発話
   */
  repromptSpeech?: any;

  /**
   * カード内容
   */
  cardContent?: any;
}
