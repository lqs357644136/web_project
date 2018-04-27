import Cookies from 'js-cookie'

const TokenKey = 'token';
const HostKey = 'host';
const LangKey = 'lang';

export function getToken() {
  return window.localStorage.getItem(TokenKey);
}

export function setToken(token) {
   window.localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  window.localStorage.remove(TokenKey);
}

export function getHost() {
  return window.localStorage.getItem(HostKey);
}

export function setHost(host) {
  window.localStorage.setItem(HostKey, host);
}

export function removeHost() {
  window.localStorage.remove(HostKey);
}

export function getLang() {
  return window.localStorage.getItem(LangKey);
}

export function setLang(lang) {
  window.localStorage.setItem(LangKey, lang);
}

export function removeLang() {
  window.localStorage.remove(LangKey);
}