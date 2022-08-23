import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PipelineComponent} from './pages/pipeline/pipeline.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: PipelineComponent},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
