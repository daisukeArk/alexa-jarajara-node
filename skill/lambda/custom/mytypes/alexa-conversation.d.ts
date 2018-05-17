declare namespace AlexaConversation {
  interface IConversation {
    (options: IOptions): IApi;
  }

  export interface IOptions {
    name: any,
    app: any,
    appId: any,
    sessionId?: any,
    userId?: any,
    accessToken?: any,
    requestId?: any,
    locale?: any,
    fixSpaces?: any,
    fuzzyDistance?: any,
    handler?: any
  }

  interface IApi {
    userSays(intentName: string, slotsArg?: any): IApi;
    plainResponse: any;
    ssmlResponse: any;
    end(): void;
  }
}

declare const conversation: AlexaConversation.IConversation;

declare module 'alexa-conversation' {
  export = conversation;
}
