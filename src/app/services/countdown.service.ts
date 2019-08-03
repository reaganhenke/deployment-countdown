import { Injectable } from '@angular/core';
import { Countdown } from '../countdown/countdown';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CountdownService {
    // private contactsUrl = '/countdowns';
    private contactsUrl = 'http://localhost:8080/countdowns';

    constructor(private http: HttpClient) {}

    getCountdowns(): Observable<object> {
      return this.http.get(this.contactsUrl);
    }

    postCountdown(countdown: Countdown): any {
      return this.http.post(this.contactsUrl, countdown);
    }

}
