import * as Util from 'util';
import * as Domains from '../../domains';
import * as Enums from '../../enums';
import { LoggerFactory } from '../../helpers/logger-factory';

/**
 * 点数計算サービス
 */
export class CalculateService {
  /**
   * コンストラクタ
   */
  constructor() {
  }

  /**
   * 計算処理
   * @param fu 符
   * @param han 翻
   * @returns 計算結果
   */
  public calculate(fu: number, han: number): Domains.ICalculateResult | undefined {
    let fuNumber: number;

    // 符を切り上げる
    if (
      fu % 10 !== 0 &&
      fu !== 25
    ) {
      // 切り上げ
      fuNumber = Math.ceil(fu / 10) * 10;
    } else {
      fuNumber = fu;
    }

    // 基本点数計算
    const result = this.calculatePoint(
      fuNumber,
      han
    );

    // ログ出力
    LoggerFactory.instance.trace(Util.inspect(result, { depth: null }));

    return result;
  }

  /**
   * 基本点数計算
   * @param fu 符
   * @param han 翻
   * @returns 基本点数
   */
  private calculatePoint(fu: number, han: number): Domains.ICalculateResult {
    let basePoint: number;
    let limitRuleType: Enums.LimitRuleTypes = Enums.LimitRuleTypes.None;

    switch (han) {
      case 1:
      case 2:
        // 1〜2翻
        basePoint = this.calculateBasePoint(fu, han);
        break;
      case 3:
        // 3翻
        if (fu < 70) {
          basePoint = this.calculateBasePoint(fu, han);
        } else {
          basePoint = 2000;
          limitRuleType = Enums.LimitRuleTypes.Mangan;
        }

        break;
      case 4:
        // 4翻
        if (fu < 40) {
          basePoint = this.calculateBasePoint(fu, han);
        } else {
          basePoint = 2000;
          limitRuleType = Enums.LimitRuleTypes.Mangan;
        }

        break;
      case 5:
        // 5翻
        basePoint = 2000;
        limitRuleType = Enums.LimitRuleTypes.Mangan;
        break;
      case 6:
      case 7:
        // 6〜7翻
        basePoint = 3000;
        limitRuleType = Enums.LimitRuleTypes.Hanaman;
        break;
      case 8:
      case 9:
      case 10:
        // 8〜10翻
        basePoint = 4000;
        limitRuleType = Enums.LimitRuleTypes.Baiman;
        break;
      case 11:
      case 12:
        // 11〜12翻
        basePoint = 6000;
        limitRuleType = Enums.LimitRuleTypes.SanBaiman;
        break;
      default:
        if (han >= 13) {
          basePoint = 8000;
          limitRuleType = Enums.LimitRuleTypes.Yakuman;
        } else {
          basePoint = 0;
        }
        break;
    }

    return {
      fu: fu,
      han: han,
      basePoint: this.getCeilingBasePoint(basePoint),
      basePointParent: this.getCeilingBasePoint(basePoint * 2),
      // 20符はピンフツモのみ
      ronPoint: (fu <= 20) ? 0 : this.getCeilingBasePoint(basePoint * 4),
      ronPointParent: (fu <= 20) ? 0 : this.getCeilingBasePoint(basePoint * 2 * 3),
      limitRuleType: limitRuleType
    };
  }

  /**
   * 基本点数計算
   * @param fu 符
   * @param han 翻
   * @returns 基本点数
   */
  private calculateBasePoint(fu: number, han: number): number {
    // 定数
    const Bazoro: number = 2 ** 2;

    return fu * Bazoro * (2 ** han);
  }

  /**
   * 切り上げ処理
   * @param point 基本点数
   * @returns 切上後基本点数
   */
  private getCeilingBasePoint(point: number): number {
    return Math.ceil(point / 100) * 100;
  }
}
