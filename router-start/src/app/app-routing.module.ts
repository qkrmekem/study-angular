import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { authGuard, authGuardChild } from "./auth-guard.service";
import { canDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers', component: ServersComponent, 
        // canActivate: [authGuard],
        canActivateChild: [authGuardChild],
        children: [
            { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
            {
                path: ':id/edit', component: EditServerComponent,
                canDeactivate: [canDeactivateGuard], }
        ]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' } // 라우터는 위에서 아래로 경로를 탐색하므로 와일드 카드는 맨 밑에서 이용해야함
    // 만약 접두사가 있을 경우 경로를 지정하려면 아래처럼 해야함(아래는 경로가 '' 비어있는 경우임)
    // {path: '', redirectTo: '/somewhere-else', pathMatch: 'full'}
]

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModuel{

}