import * as AskModel from 'ask-sdk-model';

export const slotHan: AskModel.Slot = {
  name: 'Han',
  value: 'サン',
  resolutions: {
    resolutionsPerAuthority: [
      {
        authority: '',
        status: {
          code: 'ER_SUCCESS_MATCH'
        },
        values: [
          {
            value: {
              name: 'サン',
              id: '3'
            }
          }
        ]
      }
    ]
  },
  confirmationStatus: 'NONE'
};
