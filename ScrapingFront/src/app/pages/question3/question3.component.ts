import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question3',
  templateUrl: './question3.component.html',
  styleUrls: ['./question3.component.css']
})
export class Question3Component implements OnInit {

  answer:any = {
    title: "Sit esse qui enim ipsum eiusmod ad quis exercitation.",
    image: "Dolor nulla aute voluptate enim dolore ad laborum sint ut ipsum do ut.",
    description: "Cillum anim esse minim Lorem excepteur est labore deserunt sint occaecat consectetur deserunt ipsum. Est fugiat tempor consectetur dolore minim ullamco enim Lorem exercitation elit. Consequat deserunt mollit labore ut eu irure Lorem sunt veniam deserunt aliquip pariatur nulla et. Dolor fugiat excepteur velit labore consequat adipisicing esse velit aliquip incididunt duis. Enim duis exercitation officia irure Lorem laborum qui.",
    cost: 100,
    bathroom: 2,
    room: 3,
    area: 150
  }

  constructor() { }

  ngOnInit(): void {
  }

}
