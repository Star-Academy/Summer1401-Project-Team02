import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-team-card',
    templateUrl: './team-card.component.html',
    styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
    @Input() public title!: string;
    @Input() public description!: string;
    @Input() public src!: string;
    @Input() public githubLink!: string;
    @Input() public emailLink!: string;
}
