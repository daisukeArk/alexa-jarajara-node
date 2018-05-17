import * as Enums from '../enums';

/**
 * 点数計算結果
 */
export interface ICalculateResult {
  /**
   * 符
   */
  fu: number;

  /**
   * 翻
   */
  han: number;

  /**
   * 基本点数
   */
  basePoint: number;

  /**
   * 基本点数親
   */
  basePointParent: number;

  /**
   * ロン点数
   */
  ronPoint: number;

  /**
   * ロン点数(親)
   */
  ronPointParent: number;

  /**
   * ルール種別
   */
  limitRuleType: Enums.LimitRuleTypes;
}
