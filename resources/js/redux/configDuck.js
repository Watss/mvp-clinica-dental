const dataCliente = {
    cotizaciones: [],
}

const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS';



export default function clienteReducer(state = dataCliente, action) {
    
    switch (action.type) {
        case GET_CLIENT_SUCCESS:
            return { ...state}; 
        default:
            return state;
    }
}
   