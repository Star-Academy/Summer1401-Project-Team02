import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public dropDownText: string;

    public isInPipeline: boolean = true;
    public title: string;

    public constructor(private router: Router) {
        if (this.router.url === '/data-inventory') this.isInPipeline = false;
        this.title = this.isInPipeline ? 'Pipeline' : 'Data inventory';
        this.dropDownText = this.isInPipeline ? 'Pipeline' : 'Data inventory';
    }

    public onBack(): void {
        this.router.navigateByUrl('/');
    }
}
