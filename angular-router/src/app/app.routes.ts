import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DeveloperComponent } from './developer/developer.component';

// 라우터 경로 변수
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    {path: 'developer', component: DeveloperComponent},
    {path: 'developer/:name', component: DeveloperComponent}
];

export default RouterModule.forRoot(routes) // 라우터 모듈 등록