import HTTPS from "../HTTPS";
import {setMigrates} from "../actions/setMigrates";

export const getMigrates = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/migrates',{},dispatch,getState)
        .then(response => {console.log(response);dispatch(setMigrates(response.migrates))})
};