import { IConversationCondition } from 'alexa-conversation-model-assert';
import * as App from '../src/index';

/**
 * alexa-conversationパラメータ
 */
export const options: IConversationCondition = {
  handler: App.handler,
  request: {
    locale: 'ja-JP'
  },
  testDescription: 'jara-jara',
  isEnabledTrace: true
};
