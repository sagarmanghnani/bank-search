import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BankDataModal } from '../../modals/bank-data';

/**
 * Generated class for the BankDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-details',
  templateUrl: 'bank-details.html',
})
export class BankDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  bankDetails:BankDataModal
  ionViewDidLoad() {
    let data = this.navParams.get('bankDetails');
    this.bankDetails = data;
    this.bankDetails.ifsc
  }

  generateMapLocationUrl(){
    console.log(this.bankDetails);
    if(this.bankDetails && this.bankDetails.address){
      return `https://www.google.com/maps/search/?api=1&query=${this.bankDetails.address}`
    }
  }
}
