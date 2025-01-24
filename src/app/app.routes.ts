import {RouterModule, Routes} from '@angular/router';
import {AccessComponent} from './access/access.component';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage/homepage.component';
import {SportelloViewComponent} from './sportello-view/sportello-view.component';
import {CreaSportelloComponent} from './crea-sportello/crea-sportello.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuleManagementComponent} from './aule-management/aule-management.component';
import {MaterieManagementComponent} from './materie-management/materie-management.component';
import {CreaUtenteComponent} from './crea-utente/crea-utente.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', component: AccessComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'sportello/:id', component: SportelloViewComponent},
    {path: 'create-sportello', component: CreaSportelloComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'admin-dashboard/aule', component: AuleManagementComponent},
    {path: 'admin-dashboard/materie', component: MaterieManagementComponent},
    {path: 'admin-dashboard/crea-utente', component: CreaUtenteComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
