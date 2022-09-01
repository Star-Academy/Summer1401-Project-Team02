import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() public title!: string;
    @Input() public description!: string;
    @Input() public src!: string;
    @Input() public githubLink!: string;
    @Input() public emailLink!: string;
}
