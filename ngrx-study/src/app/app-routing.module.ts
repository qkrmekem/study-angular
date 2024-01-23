import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // Lazy 모듈 설정 방법
  // 예전 문법
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  // 최신 문법
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
