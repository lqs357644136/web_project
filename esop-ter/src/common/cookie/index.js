import Cookies from 'js-cookie'

const TokenKey = 'token';
const HostKey = 'host';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getHost() {
  return Cookies.get(HostKey)
}

export function setHost(host) {
  return Cookies.set(HostKey, host)
}

export function removeHost() {
  return Cookies.remove(HostKey)
}