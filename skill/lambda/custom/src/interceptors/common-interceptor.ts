import * as Ask from 'ask-sdk-core';
import * as Util from 'util';
import { LoggerFactory } from '../helpers/logger-factory';

export const CommonInterceptor: Ask.RequestInterceptor = {
  process(handlerInput: Ask.HandlerInput) {
    LoggerFactory.instance.trace(`requestEnvelope: ${Util.inspect(handlerInput.requestEnvelope, { depth: null })}`);
  }
};
