import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BankDataModal } from '../../modals/bank-data';
import { SearchBankComponent } from '../../components/search-bank/search-bank';
import { PaginateSearchComponent } from '../../components/paginate-search/paginate-search';
import { BankDetailsService } from '../../services/bank-details';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  bankList:BankDataModal[] = [];
  searchedList:BankDataModal[] = [];
  pageSize:number = 5;
  totalPage:number = 0;
  pageMetadata = {
    index1:0,
    index2:(1 * this.pageSize) ,
    pageNumber:0
  }

  @ViewChild('search') searchBankComponent:SearchBankComponent;
  @ViewChild('paginate') paginateComponent:PaginateSearchComponent;
  constructor(public navCtrl: NavController, public bankService:BankDetailsService) {

  }

  ionViewWillEnter(){
    let pageSize = JSON.parse(localStorage.getItem('page_size'));
    if(pageSize > 0){
      this.pageSize = pageSize;
      this.totalPage = Math.floor(this.searchedList.length / this.pageSize);
      this.pageMetadata.index2 = ((this.pageMetadata.pageNumber + 1) * this.pageSize)      
    }
    this.getFavoriteBanks();
  }

  getFavoriteBanks(){
    this.searchBankComponent.clearSearchInput();
    this.bankList = JSON.parse(localStorage.getItem('favorite'))
    this.searchedList = [...this.bankList];
    this.totalPage = Math.floor(this.searchedList.length / this.pageSize)
    this.searchBankComponent.emitSearchedItem.subscribe(res => {
      this.searchedList = res;
      this.totalPage = Math.floor(this.searchedList.length / this.pageSize);
      this.paginateComponent.pageNumber = 0;
      this.paginateComponent.paginateData()
    });
    if(this.searchedList && this.searchedList.length > 0){
      this.paginateComponent.emitPageData.subscribe(res => {
        this.pageMetadata = res;
        
      })
    }
  }

  removeBankFromFavorite(bank:BankDataModal){
    
    let searchedPosition:number = -1;
    for(let i = 0; i< this.searchedList.length;i++){
      if(this.searchedList[i].ifsc == bank.ifsc){
        searchedPosition = i;
        break;
      }
    }
      if(searchedPosition >= 0){
        this.searchedList.splice(searchedPosition, 1);
      }
      searchedPosition = -1;
      let favoriteList:BankDataModal[] = JSON.parse(localStorage.getItem('favorite'));
      if(favoriteList && favoriteList.length > 0){
        for(let i = 0;i<favoriteList.length;i++){
          if(favoriteList[i].ifsc == bank.ifsc){
            searchedPosition = i;
            break;
          }
        }
        if(searchedPosition >= 0){
          favoriteList.splice(searchedPosition, 1);
        }
        this.bankList = [...favoriteList];
        localStorage.setItem('favorite', JSON.stringify(favoriteList));
        this.bankService.createToast('Selected Bank is deleted','bottom');
        this.totalPage = Math.floor(this.bankList.length / this.pageSize);
        if(!this.bankList[this.pageMetadata.index1]){
          if(this.paginateComponent.pageNumber > 0){
            this.paginateComponent.pageNumber -= 1;
            this.paginateComponent.paginateData();
          }
        }
      }
    event.stopPropagation();
  }

  navigateToBankDetails(bank:BankDataModal){
    this.navCtrl.push("BankDetailsPage", {
      bankDetails:bank
    })
  }

}
