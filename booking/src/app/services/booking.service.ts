import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookCourt(date: string, timeslot: string): Observable<any> {
    const payload = {
      date,
      timeslot
    };

    console.log('Booking court with payload:', payload);
    console.log('POST request to: sample/api');

    return of({ success: true, message: 'Booking confirmed' }).pipe(
      delay(500)
    );
  }
}
