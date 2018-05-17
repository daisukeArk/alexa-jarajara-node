import * as Alexa from 'alexa-sdk';
import * as Util from 'util';
import * as Enums from '../enums';
import { LoggerFactory } from '../helpers/logger-factory';
import * as Services from '../models/services';
import { CalculatePointUtterance as Utterance } from '../utterances/calculate-point-utterance';
import { IntentBase } from './intent-base';

/**
 * 点数計算 インテントクラス
 */
export class CalculatePointIntent extends IntentBase<Utterance> {
  /**
   * 点数計算 サービス
   */
  private calculateService: Services.CalculateService;

  /**
   * コンストラクタ
   * @param calculateService 点数計算サービス
   * @param utterance 発話
   */
  constructor(
    calculateService: Services.CalculateService,
    utterance: Utterance
  ) {
    super(utterance);

    this.calculateService = calculateService;
  }

  /**
   * アクション
   * @param context ハンドラコンテキスト
   */
  public execute(context: Alexa.Handler<Alexa.IntentRequest>) {
    // ログ出力
    LoggerFactory.instance.trace(Util.inspect(context.event.request, { depth: null }));

    // スロット収拾が完了したか判定
    if (context.event.request.dialogState !== 'COMPLETED') {
      // 完了していない場合、Alexaに委任する
      context.emit(':delegate');
      return;
    }

    // 必要情報が未定義か判定
    if (
      context.event.request.intent === undefined
    ) {
      // 未ハンドルインテントへ誘導
      context.emitWithState('Unhandled');
      return;
    }

    // 役割、符、翻を取得
    const roleType = this.getRole(context.event.request.intent.slots.Role);
    const fuNumber = this.getFu(context.event.request.intent.slots.Fu);
    const hanNumber = this.getHan(context.event.request.intent.slots.Han);

    // 役割が未定義か判定
    if (roleType === undefined) {
      // レスポンス設定
      context.response
        .speak(<any>context.t('UNHANDLED_MESSAGE') + <any>context.t('HELP_ROLE_TYPE') + <any>context.t('RETRY'))
        .listen(<any>context.t('HELP_MESSAGE'));

      // レスポンス生成
      context.emit(':responseReady');
      return;
    }

    // 符が未定義 もしくは ２０符未満 もしくは １１０を超える か判定
    if (fuNumber === undefined || isNaN(fuNumber) || fuNumber < 20 || fuNumber > 110) {
      // レスポンス設定
      context.response
        .speak(<any>context.t('UNHANDLED_MESSAGE') + <any>context.t('HELP_FU_NUMBER') + <any>context.t('RETRY'))
        .listen(<any>context.t('HELP_MESSAGE'));

      // レスポンス生成
      context.emit(':responseReady');
      return;
    }

    // 翻が未定義 もしくは １３翻を超える か判定
    if (hanNumber === undefined || hanNumber > 13) {
      // レスポンス設定
      context.response
        .speak(<any>context.t('UNHANDLED_MESSAGE') + <any>context.t('HELP_HAN_NUMBER') + <any>context.t('RETRY'))
        .listen(<any>context.t('HELP_MESSAGE'));

      // レスポンス生成
      context.emit(':responseReady');
      return;
    }

    // 点数計算
    const result = this.calculateService.calculate(fuNumber, hanNumber);

    // 点数計算が失敗した場合
    if (result === undefined) {
      // レスポンス設定
      context.response
        .speak(<any>context.t('ERROR_CALCULATE'))
        .listen(<any>context.t('HELP_MESSAGE'));

      // レスポンス生成
      context.emit(':responseReady');
      return;
    }

    // ログ出力
    LoggerFactory.instance.trace(Util.inspect(result, { depth: null }));

    // 発話取得
    const utteranceResult = this.utterance.respond(context, roleType, result);

    // レスポンス設定
    context.response
      .speak(utteranceResult.speech)
      .cardRenderer('点数のご案内', utteranceResult.cardContent, { smallImageUrl: '', largeImageUrl: '' });

    // レスポンス生成
    context.emit(':responseReady');
  }

  /**
   * 役割取得
   * @param slot スロット値
   * @returns 役割種別 もしくは undefined
   */
  private getRole(slot: Alexa.SlotValue): Enums.RoleTypes | undefined {
    /*
    Role: {
      name: 'Role',
      value: '親',
      resolutions: {
        resolutionsPerAuthority: [
          {
            authority: '',
            status: {
              code: 'ER_SUCCESS_MATCH'
            },
            values: [
              {
                value: {
                  name: '親',
                  id: '1'
                }
              }
            ]
          }
        ]
      },
      confirmationStatus: 'NONE'
    }
    */

    if (slot.resolutions === undefined) {
      return undefined;
    }

    // status.codeが不一致か判定
    if (
      slot.resolutions.resolutionsPerAuthority.length <= 0 ||
      slot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH'
    ) {
      return undefined;
    }

    if (slot.resolutions.resolutionsPerAuthority[0].values.length <= 0) {
      return undefined;
    }

    const id = Number(slot.resolutions.resolutionsPerAuthority[0].values[0].value.id);

    return <Enums.RoleTypes>id;
  }

  /**
   * 符取得
   * @param slot スロット値
   * @returns 符 もしくは undefined
   */
  private getFu(slot: Alexa.SlotValue): number | undefined {
    /*
    Fu: {
      name: 'Fu',
      value: '45',
      confirmationStatus: 'NONE'
    }
    */

    if (slot.value === undefined) {
      return undefined;
    }

    return Number(slot.value);
  }

  /**
   * 翻取得
   * @param slot スロット値
   * @returns 翻 もしくは undefined
   */
  private getHan(slot: Alexa.SlotValue): number | undefined {
    /*
    Han:
      {
        name: 'Han',
        value: 'サン',
        resolutions: {
        resolutionsPerAuthority: [
            {
              authority: '',
              status: {
                code: 'ER_SUCCESS_MATCH'
              },
              values: [
                {
                  value: {
                    name: 'サン',
                    id: '3'
                  }
                }
              ]
            }
          ]
        },
        confirmationStatus: 'NONE'
      }
    */

    if (slot.resolutions === undefined) {
      return undefined;
    }

    // status.codeが不一致か判定
    if (
      slot.resolutions.resolutionsPerAuthority.length <= 0 ||
      slot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH'
    ) {
      return undefined;
    }

    if (slot.resolutions.resolutionsPerAuthority[0].values.length <= 0) {
      return undefined;
    }

    return Number(slot.resolutions.resolutionsPerAuthority[0].values[0].value.id);
  }
}
