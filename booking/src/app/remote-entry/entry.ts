import { Component, inject } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-booking-entry',
  template: `
    <div class="booking-container">
      <h2>Badminton Court Booking</h2>
      <form (ngSubmit)="onBook()" #bookingForm="ngForm">
        <div class="form-group">
          <label for="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            [(ngModel)]="selectedDate"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="timeslot">Time Slot:</label>
          <select
            id="timeslot"
            name="timeslot"
            [(ngModel)]="selectedTimeslot"
            required
            class="form-control"
          >
            <option value="">Select a time slot</option>
            <option *ngFor="let slot of timeslots" [value]="slot">{{ slot }}</option>
          </select>
        </div>

        <button
          type="submit"
          class="btn-book"
          [disabled]="!bookingForm.form.valid"
        >
          Book
        </button>
      </form>

      <div *ngIf="bookingMessage" class="message" [class.success]="bookingSuccess">
        {{ bookingMessage }}
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      max-width: 500px;
      margin: 50px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }

    h2 {
      color: #333;
      margin-bottom: 30px;
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #4CAF50;
    }

    .btn-book {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .btn-book:hover:not(:disabled) {
      background-color: #45a049;
    }

    .btn-book:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .message {
      margin-top: 20px;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
    }

    .message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .message:not(.success) {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  `]
})
export class RemoteEntry {
  private bookingService = inject(BookingService);

  selectedDate = '';
  selectedTimeslot = '';
  timeslots: string[] = [];
  bookingMessage = '';
  bookingSuccess = false;

  constructor() {
    this.generateTimeslots();
  }

  generateTimeslots(): void {
    const slots: string[] = [];
    for (let hour = 7; hour <= 22; hour++) {
      const time = hour <= 12 ? `${hour}:00 AM` : hour === 13 ? '1:00 PM' : `${hour - 12}:00 PM`;
      slots.push(time);
    }
    this.timeslots = slots;
  }

  onBook(): void {
    if (this.selectedDate && this.selectedTimeslot) {
      this.bookingService.bookCourt(this.selectedDate, this.selectedTimeslot)
        .subscribe({
          next: (response) => {
            this.bookingMessage = 'Booking successful!';
            this.bookingSuccess = true;
            this.selectedDate = '';
            this.selectedTimeslot = '';
          },
          error: (error) => {
            this.bookingMessage = 'Booking failed. Please try again.';
            this.bookingSuccess = false;
          }
        });
    }
  }
}
