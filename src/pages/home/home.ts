import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BankDetailsService } from '../../services/bank-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public bankDetailSeervice:BankDetailsService) {

  }

  ionViewDidLoad(){
    this.getBankDetails();
  }

  getBankDetails(){
    this.bankDetailSeervice.getBankDetails('MUMBAI')
    .subscribe(res => console.log(res));
  }

}
