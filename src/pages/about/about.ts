import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BankDataModal } from '../../modals/bank-data';
import { SearchBankComponent } from '../../components/search-bank/search-bank';
import { PaginateSearchComponent } from '../../components/paginate-search/paginate-search';

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
  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter(){
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

    this.paginateComponent.emitPageData.subscribe(res => {
      this.pageMetadata = res;
      
    })
  }

}
