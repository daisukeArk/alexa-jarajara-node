import * as Config from 'config';
import * as Log4js from 'log4js';

/**
 * ロガーファクトリクラス
 */
export class LoggerFactory {

  /**
   * プロパティ - ロガーインスタンス
   */
  private static _logger: Log4js.Logger;

  /**
   * コンストラクタ
   */
  private constructor() {
  }

  /**
   * ロガーインスタンス取得
   */
  public static get instance(): Log4js.Logger {
    if (!this._logger) {
      // ロガー設定
      Log4js.configure(Config.get<string>('log4js'));

      // インスタンス設定
      this._logger = Log4js.getLogger();
    }

    // 生成済みのインスタンスを返す
    return this._logger;
  }
}
