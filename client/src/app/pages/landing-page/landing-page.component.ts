import {Component} from '@angular/core';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
    public goToStart(): void {
        document.querySelector('.menu')!.scrollIntoView({
            behavior: 'smooth',
        });
    }

    public goToTeam(): void {
        document.querySelector('.team')!.scrollIntoView({
            behavior: 'smooth',
        });
    }
}
