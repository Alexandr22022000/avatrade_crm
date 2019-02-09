import HTTPS from "../HTTPS";
import {setMigrates} from "../../personal/actions/setMigrates";

export const getMigrates = () => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/migrates',{},dispatch,getState)
        .then(response => dispatch(setMigrates(response.migrate)))
};