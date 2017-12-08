import {
  publicOpt
} from '@/router/index.js'

//根据角色给出路由
export const addRoleRouter = (role) => {
  let roleRouter = []; //最终要整合的角色对应路由页面
  for (let routeParent of roleOpt) {
    let routes = JSON.parse(JSON.stringify(routeParent));
    routes.children = [];
    for (let routeChildren of routeParent.children) {
      if (routeChildren.meta.role.indexOf(role) == 0) {
        routes.children.push(routeChildren)
      }
    }
    roleRouter.push(routes)
  }
  return roleRouter;
}

//返回菜单
export const getLeftMenu = (menus) => {
  //暂时写死匹配的菜单
  menus = [
    'homepage',
    'other01',
    'other02'
  ]

  //存放菜单信息
  let leftMenus = []

  //遍历查询需要的页面
  for (let router of publicOpt) {
    if(router.children){
      for (let route of router.children) {
        let routeTitle = route.meta.title;
        if (menus.indexOf(routeTitle) != -1) {
          let routeIcon = route.meta.title;
          let routePath = route.meta.title;
          let menu = {
            title: routeTitle,
            icon: routeIcon,
            path: routePath
          }
          leftMenus.push(menu)
        }
      }
    }
   
  }
  return leftMenus;
}
