import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})

export class AccordionComponent {
  @Input() items: { title: string, content: string }[] = [];
  openedItemIndex = 0;

  onClick(index: number) {
    if (index === this.openedItemIndex) {
      this.openedItemIndex = -1;
    }

    this.openedItemIndex = index;
  }
}
