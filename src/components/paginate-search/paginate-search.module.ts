import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { PaginateSearchComponent } from "./paginate-search";

@NgModule({
    declarations: [
        PaginateSearchComponent,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        PaginateSearchComponent
    ]
    
  })
  export class PaginateSearchModule {}