import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public dropDownText = 'select an app';
    public executeLoading = false;

    public setDropDownText(text: string): void {
        this.dropDownText = text;
    }
    public onBack(): void {}
}
