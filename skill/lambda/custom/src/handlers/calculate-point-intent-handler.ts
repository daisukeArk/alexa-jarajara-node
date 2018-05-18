import * as Ask from 'ask-sdk-core';
import * as AskModel from 'ask-sdk-model';
import * as Util from 'util';
import * as Enums from '../enums';
import { ServiceFactory } from '../factories/service-factory';
import { createUtterance } from '../factories/utterance-factory';
import { LoggerFactory } from '../helpers/logger-factory';
import { CalculatePointUtterance as Utterance } from '../utterances/calculate-point-utterance';

/**
 * 点数計算 インテントハンドラ
 */
export const CalculatePointIntentHandler: Ask.RequestHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   */
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'CalculatePointIntent'
    );
  },
  /**
   * ハンドラ実行
   * @param handlerInput ハンドラ
   */
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    // ログ出力
    LoggerFactory.instance.trace(Util.inspect(handlerInput, { depth: null }));

    // スロット収拾が完了したか判定
    if (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED'
    ) {
      // 完了していない場合、Alexaに委任する
      return handlerInput.responseBuilder
        .addDelegateDirective()
        .getResponse();
    }

    // 必要情報が未定義か判定
    if (
      handlerInput.requestEnvelope.request.type !== 'IntentRequest' ||
      handlerInput.requestEnvelope.request.intent === undefined ||
      handlerInput.requestEnvelope.request.intent.slots === undefined
    ) {
      // 未ハンドルインテントへ誘導
      // 完了していない場合、Alexaに委任する
      return handlerInput.responseBuilder
        .speak(requestAttributes.t('UNHANDLED_MESSAGE') + requestAttributes.t('HELP_MESSAGE'))
        .reprompt(requestAttributes.t('HELP_MESSAGE'))
        .getResponse();
    }

    // 役割、符、翻を取得
    const roleType = getRole(handlerInput.requestEnvelope.request.intent.slots.Role);
    const fuNumber = getFu(handlerInput.requestEnvelope.request.intent.slots.Fu);
    const hanNumber = getHan(handlerInput.requestEnvelope.request.intent.slots.Han);

    // 役割が未定義か判定
    if (roleType === undefined) {
      // レスポンス設定
      return handlerInput.responseBuilder
        .speak(requestAttributes.t('UNHANDLED_MESSAGE') + requestAttributes.t('HELP_ROLE_TYPE') + requestAttributes.t('RETRY'))
        .reprompt(requestAttributes.t('HELP_MESSAGE'))
        .getResponse();
    }

    // 符が未定義 もしくは ２０符未満 もしくは １１０を超える か判定
    if (fuNumber === undefined || isNaN(fuNumber) || fuNumber < 20 || fuNumber > 110) {
      // レスポンス設定
      return handlerInput.responseBuilder
        .speak(requestAttributes.t('UNHANDLED_MESSAGE') + requestAttributes.t('HELP_FU_NUMBER') + requestAttributes.t('RETRY'))
        .reprompt(requestAttributes.t('HELP_MESSAGE'))
        .getResponse();
    }

    // 翻が未定義 もしくは １３翻を超える か判定
    if (hanNumber === undefined || hanNumber > 13) {
      // レスポンス設定
      return handlerInput.responseBuilder
        .speak(requestAttributes.t('UNHANDLED_MESSAGE') + requestAttributes.t('HELP_HAN_NUMBER') + requestAttributes.t('RETRY'))
        .reprompt(requestAttributes.t('HELP_MESSAGE'))
        .getResponse();
    }

    // 点数計算
    const result = ServiceFactory.CalculateService.calculate(fuNumber, hanNumber);

    // 点数計算が失敗した場合
    if (result === undefined) {
      // レスポンス設定
      return handlerInput.responseBuilder
        .speak(requestAttributes.t('ERROR_CALCULATE'))
        .reprompt(requestAttributes.t('HELP_MESSAGE'))
        .getResponse();
    }

    // ログ出力
    LoggerFactory.instance.trace(Util.inspect(result, { depth: null }));

    // 発話取得
    const utteranceResult = createUtterance(Utterance).respond(handlerInput, roleType, result);

    // レスポンス設定
    return handlerInput.responseBuilder
      .speak(utteranceResult.speech)
      .withSimpleCard('点数のご案内', utteranceResult.cardContent)
      .getResponse();
  }
};

/**
 * 役割取得
 * @param slot スロット値
 * @returns 役割種別 もしくは undefined
 */
function getRole(slot: AskModel.Slot): Enums.RoleTypes | undefined {
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

  if (
    slot.resolutions === undefined ||
    slot.resolutions.resolutionsPerAuthority === undefined
  ) {
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
function getFu(slot: AskModel.Slot): number | undefined {
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
function getHan(slot: AskModel.Slot): number | undefined {
  /*
  Han: {
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

  if (
    slot.resolutions === undefined ||
    slot.resolutions.resolutionsPerAuthority === undefined
  ) {
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
