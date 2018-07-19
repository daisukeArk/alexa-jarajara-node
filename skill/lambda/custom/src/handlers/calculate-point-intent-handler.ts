import * as Ask from 'ask-sdk-core';
import * as AskModel from 'ask-sdk-model';
import * as Util from 'util';
import * as Enums from '../enums';
import { ServiceFactory } from '../factories/service-factory';
import { createUtterance } from '../factories/utterance-factory';
import { LoggerFactory } from '../helpers/logger-factory';
import { CalculatePointUtterance as Utterance } from '../utterances/calculate-point-utterance';
import { UnhandledUtterance } from '../utterances/unhandled-utterance';

/**
 * 点数計算 インテントハンドラ
 */
export const CalculatePointIntentHandler: Ask.RequestHandler = {
  /**
   * 実行判定
   * @param handlerInput ハンドラ
   */
  canHandle(handlerInput: Ask.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'CalculatePointIntent'
    );
  },
  /**
   * ハンドラ実行
   * @param handlerInput ハンドラ
   */
  handle(handlerInput: Ask.HandlerInput) {
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
      const unhandled = createUtterance(UnhandledUtterance).respond();

      return handlerInput.responseBuilder
        .speak(unhandled.speech)
        .reprompt(unhandled.repromptSpeech)
        .getResponse();
    }

    // 役割、符、翻を取得
    const roleType = getRole(handlerInput.requestEnvelope.request.intent.slots.Role);
    const fuNumber = getFu(handlerInput.requestEnvelope.request.intent.slots.Fu);
    const hanNumber = getHan(handlerInput.requestEnvelope.request.intent.slots.Han);

    // 発話取得
    const utteranceResult = createUtterance(Utterance).respond(
      ServiceFactory.CalculateService, fuNumber, hanNumber, roleType
    );

    // レスポンス設定
    let responseBuilder = handlerInput.responseBuilder
      .speak(utteranceResult.speech);

    if (utteranceResult.cardTitle && utteranceResult.cardContent) {
      responseBuilder = responseBuilder
      .withSimpleCard(utteranceResult.cardTitle, utteranceResult.cardContent);
    }

    return responseBuilder.getResponse();
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
