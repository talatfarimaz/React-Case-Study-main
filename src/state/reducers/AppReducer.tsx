import * as actionTypes from "../actionTypes";

const INITIAL_APP_STATE = {
    tableData: [],
}

export default (state = INITIAL_APP_STATE, action: any) => {
    switch (action.type) {
        case actionTypes.SET_TABLE_DATA:
            return {...state, tableData: action.payload};
        default:
            return state;
    }
};
