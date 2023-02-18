import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-not-fount',
  templateUrl: './not-fount.component.html',
  styleUrls: ['./not-fount.component.css']
})
export class NotFountComponent {
  public message: string|null = "";

  back() {
   history.back()
  }
  constructor(private route: ActivatedRoute){
    this.message = this.route.snapshot.paramMap.get('message')?this.route.snapshot.paramMap.get('message'):"";


  }

}
