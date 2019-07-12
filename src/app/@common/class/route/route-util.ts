import { Routes } from '@angular/router';

export class RouteUtil {

  static getRoutes(urls, parentRouterPath, component, authGuard): Routes {
    const routes = [];
    if (urls && urls.length > 0) {
      for (const url of urls) {
        if (url.key.indexOf(parentRouterPath) < 0) {
          continue;
        }
        const pathes = url.key.split('/');
        routes.push({
          path: pathes[pathes.length - 2] + '/' + pathes[pathes.length - 1],
          component: component,
          canActivate: [authGuard],
        });
      }
    }
    return routes;
  }

}
