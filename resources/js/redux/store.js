import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import tunks from 'redux-thunk';
import clienteReducer from './configDuck';



// EXTENCIÓN GOOGLE CHROME
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
    cliente: clienteReducer
});

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancer( applyMiddleware(tunks) ));
    return store;
}