import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { map,share } from "rxjs/operators";
import 'rxjs/add/observable/of';
import { BankDataModal } from "../modals/bank-data";
import { LoadingController, ToastController } from "ionic-angular";


@Injectable()
export class BankDetailsService {
    BANK_DETAILS_URL:string = "https://vast-shore-74260.herokuapp.com/banks";
    observable:Observable<BankDataModal[]>
    bankDetailsMap: Map<string, BankDataModal[]> = new Map();

    constructor(public http: HttpClient,
         public loadingController: LoadingController,
         public toastCtrl:ToastController
         ){

    }
    getBankDetails(city:string):Observable<BankDataModal[]> {
        let cachedResult:BankDataModal[] = JSON.parse(localStorage.getItem(city));
        let httpOptions = new HttpHeaders({
            'Content-type':'application/json'
        });
        let url = this.BANK_DETAILS_URL;
        if(city){
            url = `${url}?city=${city}`;
        }
        if(cachedResult && cachedResult.length > 0){
            return Observable.of(cachedResult);
        }else{
            let observable = this.http.get<BankDataModal[]> (url, {
                headers:httpOptions
            });
            observable.subscribe(res => {
                if(res.length > 0){
                    localStorage.setItem(city, JSON.stringify(res));
                }
            });
            return observable;
        }
        
    }

    showLoader(){
        let loading = this.loadingController.create({
            spinner:'hide',
            content: 'Please wait...'
        });
        return loading;
    }

    createToast(message:string, position:string){
        let toast = this.toastCtrl.create({
            message:message,
            duration: 3000,
            position:position
        });
        toast.present();
    }

    

}