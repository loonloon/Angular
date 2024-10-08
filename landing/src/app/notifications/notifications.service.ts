import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text: string;
}

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter(message => message.id !== value.id);
        }

        return [...acc, value];
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id: id,
      type: 'success',
      text: message
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id: id,
      type: 'error',
      text: message
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
      text: ''
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
