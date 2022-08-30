import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './landing-page.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';

@NgModule({
    declarations: [LandingPageComponent, MenuComponent],
    imports: [CommonModule, NzButtonModule, RouterModule],
})
export class LandingPageModule {}
