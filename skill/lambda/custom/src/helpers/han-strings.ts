/**
 * 翻名称を返す
 * @param han 翻数
 * @returns 翻名称
 */
export function toHanKana(han: number): string {
  let ret: string = '';

  switch (han) {
    case 1:
      ret = 'イーハン';
      break;
    case 2:
      ret = 'リャンハン';
      break;
    case 3:
      ret = 'サンハン';
      break;
    case 4:
      ret = 'スーハン';
      break;
    case 5:
      ret = 'ウーハン';
      break;
    case 6:
      ret = 'ローハン';
      break;
    case 7:
      ret = 'チーハン';
      break;
    case 8:
      ret = 'パーハン';
      break;
    case 9:
      ret = 'キュウハン';
      break;
    case 10:
      ret = 'ジュッパン';
      break;
    case 11:
      ret = 'ジュウイチハン';
      break;
    case 12:
      ret = 'ジュウニハン';
      break;
    case 13:
      ret = 'ジュウサンハン';
      break;
    default:
      break;
  }

  return ret;
}
