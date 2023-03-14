import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpLoginDataService {

  loginData  = {password  :   "www", username  :   "" };
  constructor() { }
}
