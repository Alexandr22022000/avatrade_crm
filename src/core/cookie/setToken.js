import cookies from 'client-cookies';

const setToken = token => {
  /*document.cookie += `token=${
      token === null ? "none" : token
      };max-age=2678400;path=/`;*/

  cookies.set('token', token, {expires: 2});
};

export default setToken;
