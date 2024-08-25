import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})

export class PaginatorComponent {
  @Input() numberOfPages: number = 0;
  pageOptions: number[] | undefined;
  currentPage = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.numberOfPages > 0) {
      this.pageOptions = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
    }
  }
}
