import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../custom-validator';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})

export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
    [
      CustomValidator.addition('answer', 'a', 'b'),
      Validators.required
    ]);

  ngOnInit() {
    this.mathForm.statusChanges
      .pipe(filter(value => value === 'VALID'), delay(1000), scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }
      }, { numberSolved: 0, startTime: new Date() }))
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution = (new Date().getTime() - startTime.getTime()) / numberSolved / 1000
        // used to set the value of all form controls within a FormGroup
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: ''
        });

        // used to update the value of one or more specific form controls within a FormGroup
        // this.mathForm.patchValue({
        //   b: this.randomNumber(),
        //   answer: ''
        // });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }
}
