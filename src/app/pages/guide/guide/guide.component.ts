import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  constructor() { }
  scrollIntoView(element:HTMLHeadElement){
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  ngOnInit(): void {
  }

}
