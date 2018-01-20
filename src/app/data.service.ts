import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
@Injectable()
export class DataService {
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  showInvalidUserMessage: boolean = false;
  token: any = '';
  constructor(private http:HttpClient, private router: Router, private user: UserService) { }
  //AUTHENTICATION/REGISTRATION
  public registerUser(register){
    this.http.post<any>('/api/register',register).subscribe( res => {
      if(res.status == 200){
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['']);
        },3000);
      }
      else{
          this.showErrorMessage = true;
          this.showSuccessMessage = false;
          setTimeout(() => {
            this.showErrorMessage = false;
            this.router.navigate(['register']);
          },3000);
      }
    });
  }
  public loginUser(login){
    this.http.post<any>('/api/login',login).subscribe( res => {
      if(res.status == 200){
        localStorage.setItem("token",res.token);
        this.user.token = res.token;
        this.user.oib = res.message;
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.user.userLoggedIn = true;
          this.router.navigate(['dashboard']);
        },3000);
      }
      if(res.status == 401){
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        },3000)
      }
      if(res.status == 404){
        this.showInvalidUserMessage = true;
        setTimeout(() => {
          this.showInvalidUserMessage = false;
        },3000);

      }
    });
  }
  public logoutUser(){
    localStorage.removeItem("token");
    this.user.token = '';
    this.user.oib = '';
    this.user.userLoggedIn = false;
    this.router.navigate(['']);
  }
  //EXTERN APIs
  public externCryptoCurrencyAPIcall(): Observable<any>{
    return this.http.get<any>('/api/cryptoRate');
  }
  public externExchangeRateCurrencyAPIcall(): Observable<any>{
    return this.http.get<any>('/api/exchangeRate');
  }
  public exterChartRateBitCoinAPIcall(): Observable<any>{
    return this.http.get<any>('/api/chartRateBTC');
  }
  public exterChartRateRippleAPIcall(): Observable<any>{
    return this.http.get<any>('/api/chartRateXRC');
  }
  public exterChartRateEtheriumAPIcall(): Observable<any>{
    return this.http.get<any>('/api/chartRateETH');
  }

  //SPECIFIC USER MANIPULATION
  public getUserInfo(): Observable<any>{
    let url = '/api/users/'+this.user.oib;
    return this.http.get<any>(url);
  }
  public updateUserInfo(update){
    let url = '/api/users/'+this.user.oib;
    this.http.put<any>(url,update).subscribe(res =>{
      if(res.status == 200){
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['']);
        },3000);
      }
      else{
        this.showErrorMessage = true;
        this.showSuccessMessage = false;
        setTimeout(() => {
          this.showErrorMessage = false;
        },5000);
      }
    });
  }
  public getAccountInfo(brojRacuna): Observable<any>{
    let url = '/api/accountInfo/'+brojRacuna;
    return this.http.get<any>(url);
  }

  public getAccountsForUser(): Observable<any>{
    let url = '/api/accounts/'+this.user.oib;
    return this.http.get<any>(url);
  }
  public getTransactionsForUser(): Observable<any>{
    let url = '/api/transactions/'+this.user.oib;
    return this.http.get<any>(url);
  }
  public getTransactionsForAccount(account): Observable<any>{
    let url = '/api/transactionsForAccount/'+account;
    return this.http.get<any>(url);
  }
  public setAccountForUser(account){
    let url = 'api/accounts/'+this.user.oib;
    this.http.post<any>(url,account).subscribe(res =>{
    })
  }
  public deleteAccountForUser(broj){
    let br = broj.toString();
    const headers = new HttpHeaders().set('brojRacuna', br);
    let url = 'api/accounts/'+this.user.oib;
    this.http.delete<any>(url,{headers:headers}).subscribe();
  }
  public updateAccountForUser(update){}
  public setTransactionForUser(transaction){
    let url = '/api/transactions/' + this.user.oib;
    this.http.post<any>(url,transaction).subscribe(res => {
      if(res.status == 200){
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSuccessMessage = false;
        },3000);
      }
      else{
        this.showErrorMessage = true;
        this.showSuccessMessage = false;
        setTimeout(() => {
          this.showErrorMessage = false;
        },5000);
      }
    })
  }
}
