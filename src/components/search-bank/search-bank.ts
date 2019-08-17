import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { BankDataModal } from '../../modals/bank-data';
import { AlertController, Searchbar } from 'ionic-angular';
import { Constants } from '../../Constants';
import { BankDetailsService } from '../../services/bank-details';

/**
 * Generated class for the SearchBankComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-bank',
  templateUrl: 'search-bank.html'
})
export class SearchBankComponent {

  @ViewChild('searchbar') searchbar:Searchbar
  @Output() emitSearchedItem:EventEmitter<BankDataModal[]> = new EventEmitter()
  @Input() bankData:BankDataModal[];
  searchedBank:BankDataModal[] = [];
  @Input() isSearching:boolean;
  filterType:string = Constants.FILTER_TYPE_BANK;
  previousStringLength:number = 0;
  constructor(public alertController: AlertController,
              public bankDetailService:BankDetailsService
    ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if( changes['bankData'].currentValue && changes['bankData'].currentValue.length > 0){
      this.bankData = changes['bankData'].currentValue
    }
    
  }

  searchBank(ev:any){
    if(ev && ev.target){
      let val:string = ev.target.value;
    
    let loader = this.bankDetailService.showLoader();
    if(val && val.length > 0){
      if(this.previousStringLength < val.length){
        this.searchedBank = [...this.bankData];
        this.previousStringLength = val.length;
      }
      val = val.toLowerCase();
        switch (this.filterType){
          case Constants.FILTER_TYPE_BANK:{
            this.searchedBank = this.bankData.filter(bank => {
              if(bank.bank_name.toLowerCase().includes(val)){
                return bank;
              }
            });
            break;
          }
  
          case Constants.FILTER_TYPE_ADDRESS: {
            this.searchedBank = this.bankData.filter(bank => {
              if(bank.address.toLowerCase().includes(val)){
                return bank;
              }
            });
            break;
          }
  
          case Constants.FILTER_TYPE_IFSC: {
            this.searchedBank = this.bankData.filter(bank => {
              if(`${bank.ifsc}`.toLowerCase().includes(val)){
                return bank;
              }
            });
            break;
          }
        }
  
      
    }else{
      this.searchedBank = [...this.bankData];
    }
    
    this.emitSearchedItem.emit(this.searchedBank);
    loader.dismiss();
    }
    
  }

  selectFilter(){
    console.log(Constants.FILTER_TYPE_IFSC, "printed here");
    let alert = this.alertController.create({
      title:'Select City',
      inputs:[
        {
          name:'Bank Name',
          type:'radio',
          label:'Bank Name',
          value:Constants.FILTER_TYPE_BANK,
          checked: this.filterType == Constants.FILTER_TYPE_BANK
        },
        {
          name:Constants.FILTER_TYPE_IFSC, 
          type:'radio',
          label:'IFSC',
          placeholder: 'IFSC',
          value: Constants.FILTER_TYPE_IFSC,
          checked: this.filterType == Constants.FILTER_TYPE_IFSC,
        },
        {
          name: 'City',
          type:'radio',
          label: 'City',
          placeholder: 'City',
          value: Constants.FILTER_TYPE_CITY,
          checked: this.filterType == Constants.FILTER_TYPE_CITY
        },
        {
          name: 'Address',
          type:'radio',
          label: 'Address',
          placeholder: 'Address',
          value: Constants.FILTER_TYPE_ADDRESS,
          checked: this.filterType == Constants.FILTER_TYPE_ADDRESS
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
            this.filterType = data;
          }
        }
      ]
    });
    alert.present();
  }

  clearSearchInput(){
    this.searchbar.clearInput(null);
  }

}
