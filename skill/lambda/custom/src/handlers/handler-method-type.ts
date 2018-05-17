import * as Alexa from 'alexa-sdk';

/**
 * ハンドラメソッド型
 */
export type HandlerMethod = (this: Alexa.Handler<any>) => void;

/**
 * 暗黙的インテント
 */
export interface IImplicitIntents {
  LaunchRequest: void;
  Unhandled: void;
}

/**
 * 必須インテント
 */
export interface IRequiredIntents {
  'AMAZON.CancelIntent': void;
  'AMAZON.HelpIntent': void;
  'AMAZON.StopIntent': void;
}

/**
 * デフォルトハンドラインテント種類
 */
export interface IDefaultHandlerIntents {
  CalculatePointIntent: void;
}

/**
 * デフォルトハンドラインテント種類
 */
export type defaultHandlerIntentType =
  IImplicitIntents &
  IRequiredIntents &
  IDefaultHandlerIntents;

export type defaultHandlerType = {[Parameter in keyof defaultHandlerIntentType]: HandlerMethod};
