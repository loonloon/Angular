import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  @Input() classNames = '';
  @Input() data: { name: string, age: number, job: string, [key: string]: string | number; }[] = [];
  @Input() headers: { key: string, label: string }[] = [];
}
