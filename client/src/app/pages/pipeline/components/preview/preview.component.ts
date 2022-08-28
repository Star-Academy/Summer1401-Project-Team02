import {Component, EventEmitter, Output} from '@angular/core';
import studentData from 'src/assets/students.json';
interface Student {
    id: Number;
    first_name: String;
    last_name: String;
    email: String;
    gender: String;
    age: number;
    average: number;
}
@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
    public isCollapse = false;
    public students: Student[] = studentData;
    @Output() public isCollapseChange = new EventEmitter<boolean>();

    public changeCollapseState(): void {
        this.isCollapse = !this.isCollapse;

        this.isCollapseChange.emit(this.isCollapse);
    }
}
