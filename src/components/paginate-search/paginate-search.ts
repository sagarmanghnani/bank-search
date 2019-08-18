import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BankDetailsService } from '../../services/bank-details';

/**
 * Generated class for the PaginateSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'paginate-search',
  templateUrl: 'paginate-search.html'
})
export class PaginateSearchComponent {

  @Input() pageSize:number;
  @Input() pages:number;
  @Output() emitPageData:EventEmitter<any> = new EventEmitter();
  pageNumber:number = 0;
  pageMetadata = {
    index1: 0,
    index2: 0,
    pageNumber:0
  }
  constructor(
    public bankService:BankDetailsService
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(( changes['pageSize'] && changes['pageSize'].currentValue > 0) && ( changes['pages'] && changes['pages'].currentValue > 0 )){
      this.pageSize = changes['pageSize'].currentValue;
      this.pages = changes['pages'].currentValue;
    }
  }

  ionViewDidLoad(){
    this.paginateData();
  }

  nextPage(){
    this.pageNumber += 1;
    this.paginateData();
  }

  forwardFinalPage(){
    if(this.pages > 0){
      this.pageNumber = this.pages - 1;
    }
    this.paginateData();
  }

  previousPage(){
    this.pageNumber -= 1;
    this.paginateData();
  }

  backFinalPage(){
    this.pageNumber = 0;
    this.paginateData();
  }

  paginateData(){

    if(this.pageNumber > this.pages - 1){
      this.bankService.createToast("Entered page exceeds result", "bottom");
      this.pageNumber -= 1;
      return;
    }else if(this.pageNumber < 0){
      this.bankService.createToast("Page number cannot be negative quantity", "bottom");
      this.pageNumber = 0;
      return;
    }else{
      this.pageMetadata.index1 = this.pageSize * this.pageNumber;
      this.pageMetadata.index2 = this.pageSize * (this.pageNumber + 1);
      this.pageMetadata.pageNumber = this.pageNumber;
      this.emitPageData.emit(this.pageMetadata);
    }
    
  }

}
