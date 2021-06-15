import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.css']
})
export class DaterangeComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  @Output() naKlik = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  pokreni() {
    const start = new Date(this.range.value.start).valueOf();
    const end = new Date(this.range.value.end).valueOf();
    this.naKlik.emit({ start: start, end: end })
  }
}
