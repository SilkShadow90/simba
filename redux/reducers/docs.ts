import { initialState } from '../initialState';

export enum DocsReducerType {
    'docs/openedvstuplenie' = 'docs/openedvstuplenie',
    'docs/openedtitul' = 'docs/openedtitul',
    'docs/openedregister' = 'docs/openedregister',
    'docs/openedvyazka' = 'docs/openedvyazka',
    'docs/openedposition' = 'docs/openedposition',

    // 'docs/openedClubs' = 'docs/openedClubs',
    // 'docs/openedContacts' = 'docs/openedContacts',
}

export type docsAction = {
    type: DocsReducerType;
    payload: any;
};

export function docsReducer(
    state = initialState.docsState,
    action: docsAction,
) {
    switch (action.type) {
        case DocsReducerType['docs/openedvstuplenie']:
            return {
                openedvstuplenie: true,
                openedtitul: false,
                openedregister: false,
                openedvyazka: false,
                openedposition:false,
            };
        case DocsReducerType['docs/openedtitul']:
            return {
                openedvstuplenie: false,
                openedtitul: true,
                openedregister: false,
                openedvyazka: false,
                openedposition:false,
            };
        case DocsReducerType['docs/openedregister']:
            return {
                openedvstuplenie: false,
                openedtitul: false,
                openedregister: true,
                openedvyazka: false,
                openedposition:false,
            };
        case DocsReducerType['docs/openedvyazka']:
            return {
                openedvstuplenie: false,
                openedtitul: false,
                openedregister: false,
                openedvyazka: true,
                openedposition:false,
            };
        case DocsReducerType['docs/openedposition']:
            return {
                openedvstuplenie: false,
                openedtitul: false,
                openedregister: false,
                openedvyazka: false,
                openedposition:true,
            };
        default:
            return state;
    }
}