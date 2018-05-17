import * as Alexa from 'alexa-sdk';
import * as Domains from '../domains';
import * as Enums from '../enums';
import { toHanKana } from '../helpers/han-strings';
import { LoggerFactory } from '../helpers/logger-factory';
import { UtteranceBase } from './utterance-base';

/**
 * 点数計算 発話クラス
 */
export class CalculatePointUtterance extends UtteranceBase {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /**
   * 発話内容取得
   * @param condition 条件
   */
  public respond(
    context: Alexa.Handler<any>,
    roleType: Enums.RoleTypes,
    result: Domains.ICalculateResult
  ): Domains.IUtteranceResult {
    let speech: any = '';

    // 符読み方取得
    const responseFu: string = this.convertFuToText(result.fu);

    // ルール種別が設定されていないか判定
    if (result.limitRuleType === Enums.LimitRuleTypes.None) {
      // ルール種別が設定されていない場合

      speech += <any>context.t(
        'ANSWER',
        responseFu,
        result.fu,
        toHanKana(result.han),
        result.han
      );

      if (roleType === Enums.RoleTypes.Parent) {
        speech += <any>context.t('ANSWER_PARENT_TSUMO', result.basePointParent);
        if (result.ronPointParent > 0) {
          speech += <any>context.t('ANSWER_LON', result.ronPointParent);
        }
      } else {
        speech += <any>context.t('ANSWER_CHILD_TSUMO', result.basePointParent, result.basePoint);
        if (result.ronPoint > 0) {
          speech += <any>context.t('ANSWER_LON', result.ronPoint);
        }
      }
    } else {
      // ルール種別が設定されている場合(満貫以上)

      speech += <any>context.t(
        'ANSWER_LIMIT',
        responseFu,
        result.fu,
        toHanKana(result.han),
        result.han,
        Enums.LimitRuleTypes.toNameKana(result.limitRuleType),
        Enums.LimitRuleTypes.toNameKanji(result.limitRuleType)
      );

      if (roleType === Enums.RoleTypes.Parent) {
        speech += <any>context.t('ANSWER_PARENT_TSUMO', result.basePointParent);
        speech += <any>context.t('ANSWER_LON', result.ronPointParent);
      } else {
        speech += <any>context.t('ANSWER_CHILD_TSUMO', result.basePointParent, result.basePoint);
        speech += <any>context.t('ANSWER_LON', result.ronPoint);
      }
    }

    return {
      speech: speech,
      cardContent: String(speech).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    };
  }

  /**
   * 符読み方
   * @param fu 符
   * @returns 符読み方
   */
  private convertFuToText(fu: number): string {
    let response: string = '';

    switch (fu) {
      case 20:
        response = 'ニジュップ';
        break;
      case 30:
        response = 'サンジュップ';
        break;
      case 40:
        response = 'ヨンジュップ';
        break;
      case 50:
        response = 'ゴジュップ';
        break;
      case 60:
        response = 'ロクジュップ';
        break;
      case 70:
        response = 'ナナジュップ';
        break;
      case 80:
        response = 'ハチジュップ';
        break;
      case 90:
        response = 'キュウジュップ';
        break;
      case 100:
        response = 'ヒャップ';
        break;
      case 110:
        response = 'ヒャクジュップ';
        break;
      default:
        break;
    }

    return response;
  }
}
