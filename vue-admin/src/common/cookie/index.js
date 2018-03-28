import Cookies from 'js-cookie'

const TokenKey = 'token';
const HostKey = 'host';
const LangKey = 'lang';

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
  console.log(Cookies.get(HostKey))
  return Cookies.get(HostKey)
}

export function setHost(host) {
  return Cookies.set(HostKey, host)
}

export function removeHost() {
  return Cookies.remove(HostKey)
}

export function getLang() {
  return Cookies.get(LangKey)
}

export function setLang(lang) {
  return Cookies.set(LangKey, lang)
}

export function removeLang() {
  return Cookies.remove(LangKey)
}