/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import {
  SET_MENUS
} from './type';
import * as type from 'store/mutations/type';
import {
  cookieStorage
} from 'common/storage'
import i18n from 'common/i18n'
import {
  privateModule
} from 'router/index.js'

export default {
  [type.SET_USER_INFO](state, userinfo) {
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  [type.SET_LEFTSLIDE](state) {
    state.leftSilde = state.leftSilde ? false : true
  },
  [type.SET_LANG](state, lang) {
    state.lang = lang;
    i18n.locale = state.lang;
  },
  [type.SET_MENUS](state, menus) {
    state.menus = roleMenus(menus);
  }
}

//根绝用户信息的菜单信息生成菜单目录数据
function roleMenus(menus) {
  let roleMenus = [];
  for (let privateMenu of privateModule) {
    for (let menu of menus) {
      if (menu.name.indexOf(privateMenu.name) != -1) {
        if (!menu.child) { //判断是否有二级菜单,无
          let roleMenu = {
            name: privateMenu.name,
            path: privateMenu.path,
            title: privateMenu.meta.title,
            icon: privateMenu.meta.icon
          }
          roleMenus.push(roleMenu);
        } else { //判断是否有二级菜单,有

          let roleMenu = {
            name: privateMenu.name,
            path: privateMenu.path,
            title: privateMenu.meta.title,
            icon: privateMenu.meta.icon,
            child: []
          }
          for (let privateMenuChildren of privateMenu.meta.children) {
            
            roleMenu.child.push({
              name: privateMenuChildren.name,
              path: privateMenuChildren.path,
              title: privateMenuChildren.title
            })
          }
          roleMenus.push(roleMenu);
        }
      }
    }
  }
  return roleMenus
}
