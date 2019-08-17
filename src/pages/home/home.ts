import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { BankDetailsService } from '../../services/bank-details';
import { BankDataModal } from '../../modals/bank-data';
import { SearchBankComponent } from '../../components/search-bank/search-bank';
import { PaginateSearchComponent } from '../../components/paginate-search/paginate-search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedCity:string;
  bankList:BankDataModal[] = [];
  searchedList:BankDataModal[] = [];
  totalPage:number = 0;
  pageSize:number = 5;
  pageMetadata = {
    index1:0,
    index2:(1 * this.pageSize) ,
    pageNumber:0
  }
  isSearching:boolean;

  
  @ViewChild('search') searchComponent:SearchBankComponent;
  @ViewChild('paginate') paginateComponent: PaginateSearchComponent
  constructor(public navCtrl: NavController,
     public bankDetailSeervice:BankDetailsService,
      public alertCtrl:AlertController,
    ) {
      console.log(this.pageMetadata);
  }

  ionViewDidLoad(){
    this.selectedCity = 'MUMBAI'
    this.getBankDetails();

  }

  ionViewWillEnter(){
    let pageSize = JSON.parse(localStorage.getItem('page_size'));
    if(pageSize > 0){
      this.pageSize = pageSize;
      this.totalPage = Math.floor(this.searchedList.length / this.pageSize);
      this.pageMetadata.index2 = ((this.pageMetadata.pageNumber + 1) * this.pageSize)
    }
    
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
      this.searchedList = this.bankList;
      this.totalPage = Math.floor(this.searchedList.length / this.pageSize);
      this.searchComponent.emitSearchedItem.subscribe((response) => {
        this.searchedList = response;
        this.totalPage = Math.floor(this.searchedList.length / this.pageSize);
        this.paginateComponent.pageNumber = 0;
        this.paginateComponent.paginateData()
      });
      this.paginateComponent.emitPageData.subscribe(res => {
        this.pageMetadata = res;
        
      })
    });
  }

  setFavorite(bank:BankDataModal){
    let favoriteBanks:BankDataModal[] = [];
    if(localStorage.getItem('favorite')){
    favoriteBanks = JSON.parse(localStorage.getItem('favorite'));
    let status = false;
    let position = 0; 
    for(let i = 0;i<favoriteBanks.length;i++){
      if(favoriteBanks[i].ifsc == bank.ifsc){
        status = true;
        position = i;
        break;
      }
    }

    if(status){
      favoriteBanks.splice(position, 1);
      this.bankDetailSeervice.createToast(`${bank.bank_name} is removed from favorites`, 'bottom');
    }else{
      favoriteBanks.push(bank);
      this.bankDetailSeervice.createToast(`${bank.bank_name} is added to favorites`, 'bottom');
    }
    }else{
      favoriteBanks.push(bank);
      this.bankDetailSeervice.createToast(`${bank.bank_name} is added to favorites`, 'bottom');
    }
    
    localStorage.setItem('favorite', JSON.stringify(favoriteBanks));
    event.stopPropagation();
  }

  checkFavorite(bank:BankDataModal){
    let status:boolean = false;
    if(localStorage.getItem('favorite')){
        let favoriteBanks:BankDataModal[] = JSON.parse(localStorage.getItem('favorite'));
        status = favoriteBanks.some(banks => {
        return banks.ifsc == bank.ifsc;
      });
    }

    return status;
  }

  navigateToBankDetails(bank:BankDataModal){
    this.navCtrl.push("BankDetailsPage", {
      bankDetails:bank
    })
  }

}
