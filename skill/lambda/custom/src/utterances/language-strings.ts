export const languageStrings = {
  'ja-JP': {
    'translation': {
      'WELCOME': '点数を教えて<break time="100ms"/>と言ってください。',
      'ANSWER':
        '<sub alias="{{fuAlias}}">{{fu}}符</sub><break time="100ms"/>' +
        '<sub alias="{{hanAlias}}">{{han}}翻</sub>の点数は、',
      'ANSWER_LIMIT':
        '<sub alias="{{fuAlias}}">{{fu}}符</sub><break time="100ms"/>' +
        '<sub alias="{{hanAlias}}">{{han}}翻</sub>の点数は、' +
        '<sub alias="{{limitRuleAlias}}">{{limitRule}}</sub>です。',
      'ANSWER_PARENT_TSUMO': 'ツモは<break time="100ms"/>{{point}}点オール。',
      'ANSWER_CHILD_TSUMO': 'ツモは親が<break time="100ms"/>{{pointParent}}点、子が<break time="100ms"/>{{pointChildren}}点です。',
      'ANSWER_LON': 'ロンは<break time="100ms"/>{{point}}点です。',
      'HELP_MESSAGE': '親の<sub alias="ニジュップ">20符</sub><break time="100ms"/><sub alias="サンハン">3翻</sub>の点数を教えて<break time="100ms"/>と言ってください。',
      'HELP_ROLE_TYPE': '親<break time="100ms"/>または<break time="100ms"/>子<break time="100ms"/>と言ってください。',
      'HELP_FU_NUMBER': '<sub alias="フ">符</sub>は、20から110までの数字を言ってください。',
      'HELP_HAN_NUMBER': '<sub alias="ハン">翻</sub>は、1から13までで指定してください。',
      'ERROR_CALCULATE': 'ごめんなさい。点数の計算が難しすぎました。もう一度お願いします。',
      'UNHANDLED_MESSAGE': 'ごめんなさい、よく聞きとれませんでした。',
      'RETRY': 'もう一度、点数を教えてと言ってください。',
      'GOOD_BYE': '<prosody pitch="high">また、呼んでくださいね！</prosody>'
    }
  }
};
