import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EnterComponent } from './components/enter/enter.component';




const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'enter', component: EnterComponent },
    { path: 'dashboard', loadChildren: () => import('./components/dashboard/dash.module').then(m => m.DashModule) }

]


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { enableTracing: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }