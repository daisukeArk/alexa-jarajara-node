import * as conversation from 'alexa-conversation-model-assert';
import { languageStrings } from '../../../src/utterances/language-strings';
import { options } from '../../conversation-options';
import { slotFu } from '../../slot-fu';
import { slotHan } from '../../slot-han';
import { slotRole } from '../../slot-role';

/**
 * 起動リクエスト インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: '起動リクエスト の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .equalPlain({ speech: '点数を教えてと言ってください。' })
  .end();

/**
 * ヘルプ インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: 'ヘルプインテント の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .requestIntent('AMAZON.HelpIntent')
  .equalPlain({ speech: '親の20符3翻の点数を教えてと言ってください。符は、20から110までの数字を言ってください。翻は、1から13までで指定してください。' })
  .end();

/**
 * キャンセル インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: 'キャンセルインテント の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .requestIntent('AMAZON.CancelIntent')
  .equalPlain({ speech: 'また、呼んでくださいね！' })
  .end();

/**
 * 停止 インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: '停止インテント の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .requestIntent('AMAZON.StopIntent')
  .equalPlain({ speech: 'また、呼んでくださいね！' })
  .end();

/**
 * 未ハンドル インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: '未ハンドルインテント の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .requestIntent('Unhandled')
  .equalPlain({ speech: 'ごめんなさい、よく聞きとれませんでした。親の20符3翻の点数を教えてと言ってください。' })
  .end();

/**
 * 点数計算 インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: '親の点数計算インテント の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .requestIntent('CalculatePointIntent', {
    request: {
      dialogState: 'COMPLETED',
      intent: {}
    },
    slots: {
      Role: slotRole.parent,
      Fu: slotFu,
      Han: slotHan
    }
  })
  .equalPlain({ speech: '50符3翻の点数は、ツモは3200点オール。ロンは9600点です。' })
  .end();

/**
 * 点数計算 インテントの機能テスト
 */
conversation.init(Object.assign(
  options,
  { testDescription: '子の点数計算インテント の発話が正しいこと' }
))
  .requestIntent('LaunchRequest')
  .requestIntent('CalculatePointIntent', {
    request: {
      dialogState: 'COMPLETED',
      intent: {}
    },
    slots: {
      Role: slotRole.children,
      Fu: slotFu,
      Han: slotHan
    }
  })
  .equalPlain({ speech: '50符3翻の点数は、ツモは親が3200点、子が1600点です。ロンは6400点です。' })
  .end();
