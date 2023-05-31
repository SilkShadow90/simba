import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/root';

type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export function configureStore(preloadedState: RootState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: StoreEnhancer = composeWithDevTools(...enhancers);

  const store = createStore(persistedReducer, preloadedState as RootState, composedEnhancers)
  const persistor = persistStore(store)
  return { store, persistor }
}
