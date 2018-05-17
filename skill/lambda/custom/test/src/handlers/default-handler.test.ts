import * as conversation from 'alexa-conversation';
import { languageStrings } from '../../../src/utterances/language-strings';
import { options } from '../../conversation-options';

/**
 * 起動リクエスト インテントの機能テスト
 */
conversation(
  Object.assign(
    Object.assign({}, options),
    { name: '起動リクエスト の発話が正しいこと' }
  ))
  .userSays('LaunchRequest')
  .plainResponse
  .shouldEqual('点数を教えてと言ってください。')
  .end();

/**
 * ヘルプ インテントの機能テスト
 */
conversation(
  Object.assign(
    Object.assign({}, options),
    { name: 'ヘルプインテント の発話が正しいこと' }
  ))
  .userSays('LaunchRequest')
  .userSays('AMAZON.HelpIntent')
  .plainResponse
  .shouldEqual('親の20符3翻の点数を教えてと言ってください。符は、20から110までの数字を言ってください。翻は、1から13までで指定してください。')
  .end();

/**
 * キャンセル インテントの機能テスト
 */
conversation(
  Object.assign(
    Object.assign({}, options),
    { name: 'キャンセルインテント の発話が正しいこと' }
  ))
  .userSays('LaunchRequest')
  .userSays('AMAZON.CancelIntent')
  .plainResponse
  .shouldEqual('また、呼んでくださいね！')
  .end();

/**
 * 停止 インテントの機能テスト
 */
conversation(
  Object.assign(
    Object.assign({}, options),
    { name: '停止インテント の発話が正しいこと' }
  ))
  .userSays('LaunchRequest')
  .userSays('AMAZON.StopIntent')
  .plainResponse
  .shouldEqual('また、呼んでくださいね！')
  .end();

/**
 * 未ハンドル インテントの機能テスト
 */
conversation(
  Object.assign(
    Object.assign({}, options),
    { name: '未ハンドルインテント の発話が正しいこと' }
  ))
  .userSays('LaunchRequest')
  .userSays('Unhandled')
  .plainResponse
  .shouldEqual('ごめんなさい、よく聞きとれませんでした。親の20符3翻の点数を教えてと言ってください。')
  .end();
