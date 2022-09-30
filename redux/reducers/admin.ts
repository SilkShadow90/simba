import { initialState } from '../initialState';

export enum AdminReducerType {
  'admin/openedMain' = 'admin/openedMain',
  'admin/openedCats' = 'admin/openedCats',
  'admin/openedDocs' = 'admin/openedDocs',
  'admin/openedShows' = 'admin/openedShows',
  'admin/openedClubs' = 'admin/openedClubs',
  'admin/openedContacts' = 'admin/openedContacts',
}

export type AdminAction = {
  type: AdminReducerType;
  payload: any;
};

export function adminReducer(
  state = initialState.userState,
  action: AdminAction,
) {
  switch (action.type) {
    case AdminReducerType['admin/openedMain']:
      return {
        openedMain: true,
        openedCats: false,
        openedDocs: false,
        openedShows: false,
        openedClubs: false,
        openedContacts: false,
      };
    case AdminReducerType['admin/openedCats']:
      return {
        openedMain: false,
        openedCats: true,
        openedDocs: false,
        openedShows: false,
        openedClubs: false,
        openedContacts: false,
      };
    case AdminReducerType['admin/openedDocs']:
      return {
        openedMain: false,
        openedCats: false,
        openedDocs: true,
        openedShows: false,
        openedClubs: false,
        openedContacts: false,
      };
    case AdminReducerType['admin/openedShows']:
      return {
        openedMain: false,
        openedCats: false,
        openedDocs: false,
        openedShows: true,
        openedClubs: false,
        openedContacts: false,
      };
    case AdminReducerType['admin/openedClubs']:
      return {
        openedMain: false,
        openedCats: false,
        openedDocs: false,
        openedShows: false,
        openedClubs: true,
        openedContacts: false,
      };
    case AdminReducerType['admin/openedContacts']:
      return {
        openedMain: false,
        openedCats: false,
        openedDocs: false,
        openedShows: false,
        openedClubs: false,
        openedContacts: true,
      };
    default:
      return state;
  }
}


