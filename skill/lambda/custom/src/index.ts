import * as Ask from 'ask-sdk-core';
import * as Handlers from './handlers';
import * as Interceptors from './interceptors';

/**
 * エントリポイント
 */
export const handler = Ask.SkillBuilders.custom()
.addRequestHandlers(
  Handlers.LaunchRequestHandler,
  Handlers.SessionEndedRequestHandler,
  Handlers.CancelAndStopIntentHandler,
  Handlers.HelpIntentHandler,
  Handlers.CalculatePointIntentHandler,
  Handlers.UnhandledHandler
)
.addRequestInterceptors(Interceptors.CommonInterceptor)
.addErrorHandlers(
  Handlers.ErrorHandler
)
.withSkillId(String(process.env.ALEXA_SKILL_ID))
.lambda();
