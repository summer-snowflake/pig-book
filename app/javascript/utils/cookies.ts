import Cookies, { CookieAttributes } from 'js-cookie'
import { CookiesHeader } from 'types/store'

const EXPIRE_DAYS = 7

export const setCookies = (headers: CookiesHeader): void => {
  Cookies.set('uid', headers['uid'], { expires: EXPIRE_DAYS })
  Cookies.set('client', headers['client'], { expires: EXPIRE_DAYS })
  Cookies.set('access-token', headers['access-token'], { expires: EXPIRE_DAYS })
}

export const clearCookies = (): void => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('access-token')
}

export const ready = (): boolean => {
  const uid: string | undefined = Cookies.get('uid')
  const client: string | undefined = Cookies.get('client')
  const accessToken: string | undefined = Cookies.get('access-token')

  return !!uid && !!client && !!accessToken
}

export const loginHeaders = (): CookieAttributes => {
  return Cookies.get()
}
