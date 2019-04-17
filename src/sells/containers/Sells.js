import {connect} from 'react-redux';
import Sells from '../components/Sells';
import getSells from '../async-actions/getSells';
import setDate from '../actions/setDate';
import setManager from "../actions/setManager";
import setStore from "../actions/setStore";
import setSearch from "../actions/setSearch";

export default connect(
    state=>({
        sells: state.sells.sells,
        manager_id: state.sells.manager_id,
        store_id: state.sells.store_id,
        search: state.sells.search,
        date: state.sells.date
    }),
    dispatch=>({
        onGetSells: ()=> dispatch(getSells()),
        onSetDate: (date)=> dispatch(setDate(date)),
        onSetStoreId: (id)=> dispatch(setStore(id)),
        onSetManager: (id)=> dispatch(setManager(id)),
        onSetSearch: (text)=> dispatch(setSearch(text))
    })
)(Sells);