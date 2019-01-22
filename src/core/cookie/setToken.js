const setToken = (token) => {

    document.cookie = `token=${token === null? 'none' : token};max-age=2678400;path=/`;
};

export default setToken;