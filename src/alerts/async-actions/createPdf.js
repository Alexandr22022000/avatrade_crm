import HTTPS from "../../core/HTTPS";
import getCleanUrl from "../../core/HTTPS/getCleanUrl";

const createPdf = (id) => (dispatch, getState) => {
    HTTPS.get('/api/v0.0/create_request_pdf',{id}, dispatch, getState)
        .then((response) => {
            const link = getCleanUrl() + response.link + '?token=' + getState().status.token;
            window.open(link);
        });
};

export default createPdf;