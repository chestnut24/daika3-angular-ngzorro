import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
export class AppRoutingCache implements RouteReuseStrategy {
    public static handlers: { [key: string]: DetachedRouteHandle } = {};
    private static waitDelete: string; // 当前页未进行存储时需要删除
    // 表示对路由允许复用
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 默认对所有路由复用 可通过给路由配置项增加data: { keep: true }来进行选择性使用，代码如下
        if (!route.data.keep || !route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }
        return true;
    }
    // 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // AppRoutingCache.handlers[route.routeConfig.path] = handle;
        AppRoutingCache.handlers[this.getRouteUrl(route)] = handle;
    }
    // 若path在缓存中有的都认为允许还原路由
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // return !!route.routeConfig && !!AppRoutingCache.handlers[route.routeConfig.path];
        const path = this.getRouteUrl(route);
        // const path = route.routeConfig.path;

        if (!!route.routeConfig && !!AppRoutingCache.handlers[path]) {
            let snapshot = <any>AppRoutingCache.handlers[path];
            if (snapshot.componentRef && snapshot.componentRef.instance) {
                let prototype = snapshot.componentRef.instance.__proto__;
                if (prototype['init']) {
                    snapshot.componentRef.instance.init(JSON.stringify(snapshot.componentRef.instance.routerWata)); // 刷新页面数据
                }
            }
            return true;
        } else {
            return false;
        }
    }
    // 从缓存中获取快照，若无则返回null
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        // return AppRoutingCache.handlers[route.routeConfig.path];
        return AppRoutingCache.handlers[this.getRouteUrl(route)];
    }
    // 进入路由触发，判断是否同一路由
    public shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        return future.routeConfig == current.routeConfig;
    }
    public static deleteRouteSnapshot(name: string) {
        // 删除路由快照  AppReuseStrategy.handlers数组内存储的就是路由快照
        name = name.replace(/\//g, '_');
        if (AppRoutingCache.handlers[name]) {
            delete AppRoutingCache.handlers[name];
        } else {
            AppRoutingCache.waitDelete = name;
        }
    }
    private getRouteUrl(route: ActivatedRouteSnapshot) {
        // const result = route['_routerState'].url.replace(/\//g, '_');
        // return result;
        return route['_routerState'].url.replace(/\//g, '_')
            + '_' + (route.routeConfig.loadChildren || route.routeConfig.component ? route.routeConfig.component.toString().split('(')[0].split(' ')[1] : 'userComponent');
    }
}
