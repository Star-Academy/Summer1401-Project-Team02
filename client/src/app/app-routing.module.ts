import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PipelineComponent} from './pages/pipeline/pipeline.component';
import {DataInventoryComponent} from './pages/data-inventory/data-inventory.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: LandingPageComponent},
    {path: 'pipeline', component: PipelineComponent},
    {path: 'data-inventory', component: DataInventoryComponent},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
