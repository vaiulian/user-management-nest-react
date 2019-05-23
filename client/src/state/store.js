/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const enhancers = []
const middleware = [
  thunk
]

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(
applyMiddleware(...middleware),
...enhancers
)

export default function setupStore(initialState={simpleReducer: {ceva: 123}}) {
 return createStore(
   rootReducer,
   initialState,
   composedEnhancers
 );
}