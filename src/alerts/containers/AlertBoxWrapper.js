import {connect} from 'react-redux';
import AlertBoxWrapper from "../components/AlertBoxWrapper";
import setActiveMigration from "../../core/actions/setActiveMigration";
import {getMigrates} from "../../core/async-actions/getMigrates";
import {approveMigrate} from "../../core/async-actions/approveMigrate";
import {getCargos} from "../../warehouse/async-actions/getCargos";


export default connect(
    state=> ({
        migrates: state.status.migrates,
        cargos: state.warehouse.cargos,
    }),
    dispatch=>({
        setActiveMigrate: migrate => {
            dispatch(setActiveMigration(migrate));
        },
        onLoadMigrates: () => {
            dispatch(getMigrates())
        },
        onApproveMigrate: (id) => {
            dispatch(approveMigrate(id));
        },
        onLoadCargos: () => {
            dispatch(getCargos(''))
        }
    })
)(AlertBoxWrapper);