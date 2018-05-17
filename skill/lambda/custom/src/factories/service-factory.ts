import * as Services from '../models/services';

/**
 * サービスファクトリクラス
 */
export class ServiceFactory {
  /**
   * 点数計算 サービス
   */
  private static _calculateService: Services.CalculateService;

  /**
   * コンストラクタ
   */
  private constructor() {
  }

  /**
   * 点数計算 サービスインスタンス
   */
  public static get CalculateService(): Services.CalculateService {
    if (!this._calculateService) {
      this._calculateService = new Services.CalculateService();
    }
    return this._calculateService;
  }
}
