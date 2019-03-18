import cookies from 'client-cookies';

const setStore = store => {
    cookies.set('store', store, {expires: 365});
};

export default setStore;
