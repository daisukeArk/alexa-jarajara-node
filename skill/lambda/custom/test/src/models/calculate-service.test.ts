import * as Lambda from 'aws-lambda';
import * as Mocha from 'mocha';
import { It, Mock } from 'moq.ts';
import * as Assert from 'power-assert';
import * as Sinon from 'sinon';

import * as Domains from '../../../src/domains';
import { CalculateService } from '../../../src/models/services/calculate-service';

interface ITestData {
  fu: number;
  han: number;
  result: number;
  resultParent: number;
  resultRonPoint: number;
  resultRonPointParent: number;
}

/**
 * テスト
 */
describe('calculate-serviceのテスト', () => {

  // テスト対象オブジェクト
  let target: CalculateService;

  /**
   * 前処理
   */
  before(() => {
    // 対象インスタンス作成
    target = new CalculateService();
  });

  /**
   * 前処理（各テスト毎）
   */
  beforeEach(() => {

  });

  /**
   * 後処理（各テスト毎）
   */
  afterEach(() => {

  });

  /**
   * 後処理
   */
  after(() => {

  });

  describe('calculate - メソッドのテスト', () => {
    let result: Domains.ICalculateResult | undefined;

    const testData: ITestData[] = [
      { fu: 20, han: 2, result: 400, resultParent: 700, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 3, result: 700, resultParent: 1300, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 4, result: 1300, resultParent: 2600, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 0, resultRonPointParent: 0 },
      { fu: 20, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 0, resultRonPointParent: 0 },

      { fu: 25, han: 2, result: 400, resultParent: 800, resultRonPoint: 1600, resultRonPointParent: 2400 },
      { fu: 25, han: 3, result: 800, resultParent: 1600, resultRonPoint: 3200, resultRonPointParent: 4800 },
      { fu: 25, han: 4, result: 1600, resultParent: 3200, resultRonPoint: 6400, resultRonPointParent: 9600 },
      { fu: 25, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 25, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 25, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 25, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 25, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 25, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 25, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 25, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 25, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 30, han: 1, result: 300, resultParent: 500, resultRonPoint: 1000, resultRonPointParent: 1500 },
      { fu: 30, han: 2, result: 500, resultParent: 1000, resultRonPoint: 2000, resultRonPointParent: 2900 },
      { fu: 30, han: 3, result: 1000, resultParent: 2000, resultRonPoint: 3900, resultRonPointParent: 5800 },
      { fu: 30, han: 4, result: 2000, resultParent: 3900, resultRonPoint: 7700, resultRonPointParent: 11600 },
      { fu: 30, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 30, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 30, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 30, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 30, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 30, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 30, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 30, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 30, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 40, han: 1, result: 400, resultParent: 700, resultRonPoint: 1300, resultRonPointParent: 2000 },
      { fu: 40, han: 2, result: 700, resultParent: 1300, resultRonPoint: 2600, resultRonPointParent: 3900 },
      { fu: 40, han: 3, result: 1300, resultParent: 2600, resultRonPoint: 5200, resultRonPointParent: 7700 },
      { fu: 40, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 40, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 40, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 40, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 40, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 40, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 40, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 40, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 40, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 40, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 50, han: 1, result: 400, resultParent: 800, resultRonPoint: 1600, resultRonPointParent: 2400 },
      { fu: 50, han: 2, result: 800, resultParent: 1600, resultRonPoint: 3200, resultRonPointParent: 4800 },
      { fu: 50, han: 3, result: 1600, resultParent: 3200, resultRonPoint: 6400, resultRonPointParent: 9600 },
      { fu: 50, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 50, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 50, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 50, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 50, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 50, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 50, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 50, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 50, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 50, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 60, han: 1, result: 500, resultParent: 1000, resultRonPoint: 2000, resultRonPointParent: 2900 },
      { fu: 60, han: 2, result: 1000, resultParent: 2000, resultRonPoint: 3900, resultRonPointParent: 5800 },
      { fu: 60, han: 3, result: 2000, resultParent: 3900, resultRonPoint: 7700, resultRonPointParent: 11600 },
      { fu: 60, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 60, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 60, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 60, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 60, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 60, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 60, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 60, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 60, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 60, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 70, han: 1, result: 600, resultParent: 1200, resultRonPoint: 2300, resultRonPointParent: 3400 },
      { fu: 70, han: 2, result: 1200, resultParent: 2300, resultRonPoint: 4500, resultRonPointParent: 6800 },
      { fu: 70, han: 3, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 70, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 70, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 70, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 70, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 70, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 70, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 70, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 70, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 70, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 70, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 80, han: 1, result: 700, resultParent: 1300, resultRonPoint: 2600, resultRonPointParent: 3900 },
      { fu: 80, han: 2, result: 1300, resultParent: 2600, resultRonPoint: 5200, resultRonPointParent: 7700 },
      { fu: 80, han: 3, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 80, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 80, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 80, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 80, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 80, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 80, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 80, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 80, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 80, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 80, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 90, han: 1, result: 800, resultParent: 1500, resultRonPoint: 2900, resultRonPointParent: 4400 },
      { fu: 90, han: 2, result: 1500, resultParent: 2900, resultRonPoint: 5800, resultRonPointParent: 8700 },
      { fu: 90, han: 3, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 90, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 90, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 90, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 90, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 90, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 90, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 90, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 90, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 90, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 90, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 100, han: 1, result: 800, resultParent: 1600, resultRonPoint: 3200, resultRonPointParent: 4800 },
      { fu: 100, han: 2, result: 1600, resultParent: 3200, resultRonPoint: 6400, resultRonPointParent: 9600 },
      { fu: 100, han: 3, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 100, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 100, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 100, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 100, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 100, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 100, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 100, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 100, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 100, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 100, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 },

      { fu: 110, han: 1, result: 900, resultParent: 1800, resultRonPoint: 3600, resultRonPointParent: 5300 },
      { fu: 110, han: 2, result: 1800, resultParent: 3600, resultRonPoint: 7100, resultRonPointParent: 10600 },
      { fu: 110, han: 3, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 110, han: 4, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 110, han: 5, result: 2000, resultParent: 4000, resultRonPoint: 8000, resultRonPointParent: 12000 },
      { fu: 110, han: 6, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 110, han: 7, result: 3000, resultParent: 6000, resultRonPoint: 12000, resultRonPointParent: 18000 },
      { fu: 110, han: 8, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 110, han: 9, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 110, han: 10, result: 4000, resultParent: 8000, resultRonPoint: 16000, resultRonPointParent: 24000 },
      { fu: 110, han: 11, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 110, han: 12, result: 6000, resultParent: 12000, resultRonPoint: 24000, resultRonPointParent: 36000 },
      { fu: 110, han: 13, result: 8000, resultParent: 16000, resultRonPoint: 32000, resultRonPointParent: 48000 }
    ];

    it('計算結果が正しいこと', () => {

      for (const data of testData) {
        try {
          // 実行
          result = target.calculate(data.fu, data.han);
        } catch (error) {
          Assert.fail(error);
          return;
        }

        if (result === undefined) {
          Assert.fail('結果が未定義です。');
          return;
        }

        // アサーション
        Assert.equal(result.basePoint, data.result);
        Assert.equal(result.basePointParent, data.resultParent);
        Assert.equal(result.ronPoint, data.resultRonPoint);
        Assert.equal(result.ronPointParent, data.resultRonPointParent);
      }
    });
  });
});
