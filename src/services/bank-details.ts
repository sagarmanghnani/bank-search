import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators"
import { BankDataModal } from "../modals/bank-data";
import { LoadingController } from "ionic-angular";


@Injectable()
export class BankDetailsService {
    BANK_DETAILS_URL:string = "https://vast-shore-74260.herokuapp.com/banks";

    constructor(public http: HttpClient, public loadingController: LoadingController){

    }
    getBankDetails(city:string):Observable<BankDataModal[]> {
        let httpOptions = new HttpHeaders({
            'Content-type':'application/json'
        });
        let url = this.BANK_DETAILS_URL;
        if(city){
            url = `${url}?city=${city}`;
        }
        return this.http.get<BankDataModal[]> (url, {
            headers:httpOptions
        });
        
    }

    showLoader(){
        let loading = this.loadingController.create({
            spinner:'hide',
            content: 'Please wait...'
        });
        return loading;
    }
}