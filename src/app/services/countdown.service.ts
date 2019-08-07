import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countdown } from '../shared/countdown.model';

@Injectable()
export class CountdownService {
    // private contactsUrl = '/api/countdowns';
    private apiUrl = 'https://frozen-mountain-58847.herokuapp.com/api/countdowns';

    constructor(private http: HttpClient) {}

    getCountdown(id: string): Observable<object> {
      return this.http.get(this.apiUrl + '/' + id);
    }

    postCountdown(countdown: Countdown): Observable<any> {
      return this.http.post(this.apiUrl, countdown);
    }

}
