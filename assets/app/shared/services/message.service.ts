import { BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
    private subject = new BehaviorSubject<string>(null);
    currentMessage = this.subject.asObservable();

    constructor() {}

    changeMessage(message: string) {
        console.log("called change message: " + message);
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next(null);
    }
}