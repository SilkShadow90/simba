import { TablesReducerType } from '../reducers/tables';
import { AppThunk } from '../index';
import { delay } from '../../utils';
import { RecordCRUD } from '../../api/types';
import FieldsMethods from '../../api/FieldsMethods';

const actionTablesStartFetch = { type: TablesReducerType['tables/startFetch'] };
const actionTablesCompletedFetch = (tables: RecordCRUD) => ({
  type: TablesReducerType['tables/completedFetch'],
  payload: { tables },
});

const actionTablesErrorFetch = { type: TablesReducerType['tables/errorFetch'] };

export const fetchTables =
  (): AppThunk =>
    async (dispatch): Promise<void> => {
      dispatch(actionTablesStartFetch);

      try {
        await delay(1000);

        const tables = await FieldsMethods.getData();

        if (tables) {
          dispatch(actionTablesCompletedFetch(tables));
        } else {
          throw new Error('no tables');
        }
      } catch (e) {
        console.error(e);
        dispatch(actionTablesErrorFetch);
      }
    };
