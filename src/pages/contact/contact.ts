import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  pageSize:number;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    let pageSize:number = JSON.parse(localStorage.getItem('page_size'));
    if(pageSize > 0){
      this.pageSize = pageSize;
    }
  }

  assignPageSize(){
    if(this.pageSize > 0){
      localStorage.setItem('page_size', JSON.stringify(this.pageSize))
    }
  }

}
