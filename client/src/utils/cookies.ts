import Cookies from 'js-cookie';

const EXPIRE_DAYS = 7

export const setCookies = (headers: { uid: string, client: string, 'access-token': string }) => {
  Cookies.set('uid', headers['uid'], { expires: EXPIRE_DAYS });
  Cookies.set('client', headers['client'], { expires: EXPIRE_DAYS });
  Cookies.set('access-token', headers['access-token'], { expires: EXPIRE_DAYS });
}

export const clearCookies = () => {
  Cookies.remove('uid');
  Cookies.remove('client');
  Cookies.remove('access-token');
}
