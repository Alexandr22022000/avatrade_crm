const setToken = (token) => {
    document.cookie = `@@@token=${token};max-age=2678400;path=/`;
};

export default setToken;