/**
 * 上がりルール種別
 */
enum LimitRuleTypes {
  /**
   * 未指定
   */
  None = 0,

  /**
   * 満貫
   */
  Mangan = 4,

  /**
   * 跳満
   */
  Hanaman = 6,

  /**
   * 倍満
   */
  Baiman = 8,

  /**
   * 三倍満
   */
  SanBaiman = 11,

  /**
   * 役満
   */
  Yakuman = 13
}

namespace LimitRuleTypes {
  /**
   * ルール種別名称変換
   * @param limitType ルール種別
   * @returns ルール種別名称
   */
  export function toNameKanji(limitType: LimitRuleTypes): string {
    let ret: string = '';

    switch (limitType) {
      case LimitRuleTypes.Mangan:
        ret = '満貫';
        break;
      case LimitRuleTypes.Hanaman:
        ret = '跳満';
        break;
      case LimitRuleTypes.Baiman:
        ret = '倍満';
        break;
      case LimitRuleTypes.SanBaiman:
        ret = '三倍満';
        break;
      case LimitRuleTypes.Yakuman:
        ret = '役満';
        break;
      default:
        break;
    }

    return ret;
  }

  /**
   * ルール種別名称カナ変換
   * @param limitType ルール種別
   * @returns ルール種別名称カナ
   */
  export function toNameKana(limitType: LimitRuleTypes): string {
    let ret: string = '';

    switch (limitType) {
      case LimitRuleTypes.Mangan:
        ret = 'マンガン';
        break;
      case LimitRuleTypes.Hanaman:
        ret = 'ハネマン';
        break;
      case LimitRuleTypes.Baiman:
        ret = 'バイマン';
        break;
      case LimitRuleTypes.SanBaiman:
        ret = 'サンバイマン';
        break;
      case LimitRuleTypes.Yakuman:
        ret = 'ヤクマン';
        break;
      default:
        break;
    }

    return ret;
  }
}

export {
  LimitRuleTypes
};
