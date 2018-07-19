import * as __ from 'underscore';
import * as Enums from '../enums';
import { toHanKana } from '../helpers/han-strings';
import { LoggerFactory } from '../helpers/logger-factory';
import { CalculateService } from '../models/services/calculate-service';
import { ICalculatePointSpeechOutput as ISpeechOutput } from '../utterances/domains/calculate-point-speech-output';
import { ILanguageStrings } from './language-strings';
import { UtteranceBase } from './utterance-base';

/**
 * 点数計算 発話クラス
 */
export class CalculatePointUtterance extends UtteranceBase {
  /**
   * コンストラクタ
   * @param languageStrings 発話セット
   */
  constructor(languageStrings: ILanguageStrings) {
    super(languageStrings);
  }

  /**
   * 発話内容取得
   * @param calculateService 計算サービス
   * @param fuNumber 符
   * @param hanNumber 翻
   * @param roleType 親(1) or 子(2)
   * @returns 発話内容
   */
  public respond(
    calculateService: CalculateService,
    fuNumber: number | undefined,
    hanNumber: number | undefined,
    roleType: Enums.RoleTypes | undefined
  ): ISpeechOutput {
    // 役割が未定義か判定
    if (roleType === undefined) {
      // レスポンス設定
      return {
        speech: this.languageStrings.ja.UNHANDLED_MESSAGE + this.languageStrings.ja.HELP_ROLE_TYPE + this.languageStrings.ja.RETRY,
        repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
      };
    }

    // 符が未定義 もしくは ２０符未満 もしくは １１０を超える か判定
    if (fuNumber === undefined || isNaN(fuNumber) || fuNumber < 20 || fuNumber > 110) {
      // レスポンス設定
      return {
        speech: this.languageStrings.ja.UNHANDLED_MESSAGE + this.languageStrings.ja.HELP_FU_NUMBER + this.languageStrings.ja.RETRY,
        repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
      };
    }

    // 翻が未定義 もしくは １３翻を超える か判定
    if (hanNumber === undefined || hanNumber > 13) {
      // レスポンス設定
      return {
        speech: this.languageStrings.ja.UNHANDLED_MESSAGE + this.languageStrings.ja.HELP_HAN_NUMBER + this.languageStrings.ja.RETRY,
        repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
      };
    }

    // 点数計算
    const result = calculateService.calculate(fuNumber, hanNumber);

    // 点数計算が失敗した場合
    if (result === undefined) {
      // レスポンス設定
      return {
        speech: this.languageStrings.ja.ERROR_CALCULATE,
        repromptSpeech: this.languageStrings.ja.HELP_MESSAGE
      };
    }

    let speech: any = '';

    // 符読み方取得
    const responseFu: string = this.convertFuToText(result.fu);

    // ルール種別が設定されていないか判定
    if (result.limitRuleType === Enums.LimitRuleTypes.None) {
      // ルール種別が設定されていない場合

      speech += __.template(this.languageStrings.ja.ANSWER)(
        {
          fuAlias: responseFu,
          fu: result.fu,
          hanAlias: toHanKana(result.han),
          han: result.han
        }
      );

      if (roleType === Enums.RoleTypes.Parent) {
        speech += __.template(this.languageStrings.ja.ANSWER_PARENT_TSUMO)({ point: result.basePointParent });
        if (result.ronPointParent > 0) {
          speech += __.template(this.languageStrings.ja.ANSWER_LON)({ point: result.ronPointParent });
        }
      } else {
        speech += __.template(this.languageStrings.ja.ANSWER_CHILD_TSUMO)(
          { pointParent: result.basePointParent, pointChildren: result.basePoint }
        );
        if (result.ronPoint > 0) {
          speech += __.template(this.languageStrings.ja.ANSWER_LON)({ point: result.ronPoint });
        }
      }
    } else {
      // ルール種別が設定されている場合(満貫以上)

      speech += __.template(this.languageStrings.ja.ANSWER_LIMIT)(
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
        speech += __.template(this.languageStrings.ja.ANSWER_PARENT_TSUMO)({ point: result.basePointParent });
        speech += __.template(this.languageStrings.ja.ANSWER_LON)({ point: result.ronPointParent });
      } else {
        speech += __.template(this.languageStrings.ja.ANSWER_CHILD_TSUMO)(
          { pointParent: result.basePointParent, pointChildren: result.basePoint }
        );
        speech += __.template(this.languageStrings.ja.ANSWER_LON)({ point: result.ronPoint });
      }
    }

    return {
      speech: speech,
      cardTitle: '点数のご案内',
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
