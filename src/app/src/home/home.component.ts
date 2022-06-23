import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [1077, 839, 841].map(
    (n) => `https://picsum.photos/id/${n}/1400/500`
  );

  constructor() {}

  ngOnInit(): void {}
}
