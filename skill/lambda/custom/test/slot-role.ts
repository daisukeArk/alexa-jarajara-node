import * as AskModel from 'ask-sdk-model';

export const slotRole: { [key: string]: AskModel.Slot } = {
  parent: {
    name: 'Role',
    value: '親',
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
                name: '親',
                id: '1'
              }
            }
          ]
        }
      ]
    },
    confirmationStatus: 'NONE'
  },
  children: {
    name: 'Role',
    value: '子',
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
                name: '子',
                id: '2'
              }
            }
          ]
        }
      ]
    },
    confirmationStatus: 'NONE'
  }
};
