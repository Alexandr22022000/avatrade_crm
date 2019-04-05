import {connect} from 'react-redux';
import CollectionModal from "../components/CollectionModal";
import postCollection from "../async-actions/postCollection";

export default connect(
    state => ({
        storeId: state.status.storeId,
    }),
    dispatch => ({
        onCollect: (store_id, value) => dispatch(postCollection(store_id, value)),
    }),
)(CollectionModal);