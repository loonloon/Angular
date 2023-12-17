import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appClass]'
})

export class ClassDirective {
  constructor(private element: ElementRef) {
  }

  @Input() set backgroundColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }

  @Input('appClass') set classNames(classObject: any) {
    for (let key in classObject) {
      if (classObject[key]) {
        this.element.nativeElement.classList.add(key);
      }
      else {
        this.element.nativeElement.classList.remove(key);
      }
    }
  }
}
