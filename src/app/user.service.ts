import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  token: any = '';
  oib: any = '';
  userLoggedIn: boolean = false;
  extractedToken: any = {};

  constructor() { }

}
