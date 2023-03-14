import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  MatTableDataSource } from '@angular/material/table';
import { IPizzaKind } from '../../../t1/src/app/types';

@Injectable({
  providedIn: 'root',
})
export class DriverService {

  public Cities:any
  public Streets:any;
  public PizzaList:any;
  displayedColumns: string[] = ['Name', 'Desc', 'Price', 'action'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  pageNumber: number = 1;
  VOForm: any ;
   isEditableNew: boolean = true;

  constructor(private http: HttpClient) {}

  getdriversLarge() {
    return this.http
      .get<any>('assets/PizzaList.json')
      .subscribe(data =>{
        let tt:any = data;
        this.PizzaList =  tt.data;
        }
         )
        }



  getCities(){
    this.http.get("assets/cities.json").subscribe(data =>{
      console.log(data);
      let tt:any = data;
      this.Cities =  tt['cities']['city'].map((t: { english_name?: any; name?: any; })=>  (t = {name: t.english_name.toString()}  ))
      ;
    })}

    getStreets(){
      this.http.get("assets/streets.json").subscribe(data =>{
        console.log(data);
        let tt:any = data;
        this.Streets =  tt['streets']['street'].map((t: { english_name?: any; name?: any; })=>  (t = {name: t.english_name.toString()}  ))
        ;
      })}

}
