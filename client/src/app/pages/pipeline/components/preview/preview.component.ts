import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
    public isCollapse = false;

    @Output() public isCollapseChange = new EventEmitter<boolean>();

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
