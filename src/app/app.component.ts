import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'ng-bootstrap-datepicker';
  model!: NgbDateStruct;
  date!: { year: number, month: number };
  constructor (private calendar: NgbCalendar) {}
  // Range calender
  hoveredDate: NgbDate | null = null;
  minSelectableDate: NgbDate = this.calendar.getNext(this.calendar.getToday(), 'd');
  maxSelectableDate: NgbDate = this.calendar.getNext(this.calendar.getToday(), 'm');
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
