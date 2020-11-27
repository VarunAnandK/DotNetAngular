import { Component } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public helper: CommonHelper) {
  }
}

