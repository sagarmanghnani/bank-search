import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { BankDetailsService } from '../../services/bank-details';
import { BankDataModal } from '../../modals/bank-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedCity:string;
  bankList:BankDataModal[] = [];
  
  constructor(public navCtrl: NavController,
     public bankDetailSeervice:BankDetailsService,
      public alertCtrl:AlertController,
    ) {

  }

  ionViewDidLoad(){
    this.selectedCity = 'MUMBAI'
    this.getBankDetails();
  }

  selectCity(){
    let alert = this.alertCtrl.create({
      title:'Select City',
      inputs:[
        {
          name:'MUMBAI',
          type:'radio',
          placeholder: 'MUMBAI',
          label:'MUMBAI',
          value:'MUMBAI'
        },
        {
          name:'BANGALORE', 
          type:'radio',
          label:'BANGALORE',
          placeholder: 'BANGALORE',
          value: 'BANGALORE'
        },
        {
          name: 'DELHI',
          type:'radio',
          label: 'DELHI',
          placeholder: 'DELHI',
          value: 'DELHI'
        }
      ],
      buttons: [
        {
          text:'cancel',
          role:'cancel'
        },
        {
          text: 'Ok',
          handler: (data) =>{
            this.selectedCity = data;
            this.getBankDetails();
          }
        }
      ]
    });
    alert.present();
  }

  getBankDetails(){
    let loader = this.bankDetailSeervice.showLoader();
    loader.present();
    this.bankDetailSeervice.getBankDetails(this.selectedCity)
    .subscribe(res => {
      loader.dismiss();
      this.bankList = [...res];
    });
  }

  setFavorite(bank:BankDataModal){
    let favoriteBanks:string[] = [];
    if(localStorage.getItem('favorite')){
    favoriteBanks = JSON.parse(localStorage.getItem('favorite'));
    let status = false;
    let position = 0; 
    for(let i = 0;i<favoriteBanks.length;i++){
      if(favoriteBanks[i] == bank.ifsc){
        status = true;
        position = i;
        break;
      }
    }

    if(status){
      favoriteBanks.splice(position, 1);
      this.bankDetailSeervice.createToast(`${bank.bank_name} is removed from favorites`, 'bottom');
    }else{
      favoriteBanks.push(bank.ifsc);
      this.bankDetailSeervice.createToast(`${bank.bank_name} is added to favorites`, 'bottom');
    }
    }else{
      favoriteBanks.push(bank.ifsc);
      this.bankDetailSeervice.createToast(`${bank.bank_name} is added to favorites`, 'bottom');
    }
    
    localStorage.setItem('favorite', JSON.stringify(favoriteBanks));
    
  }

  checkFavorite(bank:BankDataModal){
    let status:boolean = false;
    if(localStorage.getItem('favorite')){
        let favoriteBanks:string[] = JSON.parse(localStorage.getItem('favorite'));
        status = favoriteBanks.some(bank_ifsc => {
        return bank_ifsc == bank.ifsc;
      });
    }

    return status;
  }

}
