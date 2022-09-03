import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './landing-page.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {TeamComponent} from './components/team/team.component';
import {TeamCardComponent} from './components/team/components/card/team-card.component';
import {NzCardModule} from 'ng-zorro-antd/card';

@NgModule({
    declarations: [LandingPageComponent, MenuComponent, TeamComponent, TeamCardComponent],
    imports: [CommonModule, NzButtonModule, RouterModule, NzCardModule],
})
export class LandingPageModule {}
