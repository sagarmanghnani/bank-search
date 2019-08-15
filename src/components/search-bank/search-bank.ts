import { Component, Input } from '@angular/core';
import { BankDataModal } from '../../modals/bank-data';

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

  @Input() bankData:BankDataModal;
  constructor() {
    
  }

  searchBank(filterType?:string){
    
  }

}
