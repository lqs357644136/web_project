import { roleOpt } from '@/router/index.js'

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


//根据角色给出菜单
