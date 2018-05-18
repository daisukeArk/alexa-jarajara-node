import * as Ask from 'ask-sdk-core';
import * as Domains from '../domains';
import * as Enums from '../enums';
import { toHanKana } from '../helpers/han-strings';
import { LoggerFactory } from '../helpers/logger-factory';
import { ICalculatePointSpeechOutput as ISpeechOutput } from '../utterances/domains/calculate-point-speech-output';
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
   * @param handlerInput ハンドラコンテキスト
   * @param roleType 親(1) or 子(2)
   * @param result 点数計算結果
   * @returns 発話内容
   */
  public respond(
    handlerInput: Ask.HandlerInput,
    roleType: Enums.RoleTypes,
    result: Domains.ICalculateResult
  ): ISpeechOutput {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    let speech: any = '';

    // 符読み方取得
    const responseFu: string = this.convertFuToText(result.fu);

    // ルール種別が設定されていないか判定
    if (result.limitRuleType === Enums.LimitRuleTypes.None) {
      // ルール種別が設定されていない場合

      speech += requestAttributes.t(
        'ANSWER',
        {
          fuAlias: responseFu,
          fu: result.fu,
          hanAlias: toHanKana(result.han),
          han: result.han
        }
      );

      if (roleType === Enums.RoleTypes.Parent) {
        speech += requestAttributes.t('ANSWER_PARENT_TSUMO', { point: result.basePointParent });
        if (result.ronPointParent > 0) {
          speech += requestAttributes.t('ANSWER_LON', { point: result.ronPointParent });
        }
      } else {
        speech += requestAttributes.t('ANSWER_CHILD_TSUMO', { pointParent: result.basePointParent, pointChildren: result.basePoint });
        if (result.ronPoint > 0) {
          speech += requestAttributes.t('ANSWER_LON', { point: result.ronPoint });
        }
      }
    } else {
      // ルール種別が設定されている場合(満貫以上)

      speech += requestAttributes.t(
        'ANSWER_LIMIT',
        {
          fuAlias: responseFu,
          fu: result.fu,
          hanAlias: toHanKana(result.han),
          han: result.han,
          limitRuleAlias: Enums.LimitRuleTypes.toNameKana(result.limitRuleType),
          limitRule: Enums.LimitRuleTypes.toNameKanji(result.limitRuleType)
        }
      );

      if (roleType === Enums.RoleTypes.Parent) {
        speech += requestAttributes.t('ANSWER_PARENT_TSUMO', { point: result.basePointParent });
        speech += requestAttributes.t('ANSWER_LON', { point: result.ronPointParent });
      } else {
        speech += requestAttributes.t('ANSWER_CHILD_TSUMO', { pointParent: result.basePointParent, pointChildren: result.basePoint });
        speech += requestAttributes.t('ANSWER_LON', { point: result.ronPoint });
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
