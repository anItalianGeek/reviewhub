import {RouterModule, Routes} from '@angular/router';
import {AccessComponent} from './access/access.component';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage/homepage.component';
import {SportelloViewComponent} from './sportello-view/sportello-view.component';
import {CreaSportelloComponent} from './crea-sportello/crea-sportello.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', component: AccessComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'sportello/:id', component: SportelloViewComponent},
    {path: 'create-sportello', component: CreaSportelloComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
