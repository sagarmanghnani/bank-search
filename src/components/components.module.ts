import { NgModule } from '@angular/core';
import { SearchBankComponent } from './search-bank/search-bank';
import { PaginateSearchComponent } from './paginate-search/paginate-search';
@NgModule({
	declarations: [SearchBankComponent,
    PaginateSearchComponent],
	imports: [],
	exports: [SearchBankComponent,
    PaginateSearchComponent]
})
export class ComponentsModule {}
