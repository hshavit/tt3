
import { OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from './modal/modal.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';

/* import {MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog'; */
import {ViewChild,  ElementRef, HostListener, Component } from '@angular/core';

import { DriverService } from './driver.service';
import { IPizzaKind,  LazyLoadEvent } from '../../../t1/src/app/types';
import { EmpLoginDataService } from './emp-login-data.service';
export interface PeriodicElement {
  Name: string;
  Desc: string;
  Price: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Name: "ss", Desc:"tt", Price: '44'}
  /* {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne'}, */
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  @ViewChild('nname', { read: ElementRef })  nname!: ElementRef;
  @ViewChild('iid', { read: ElementRef })  iid!: ElementRef;
  @ViewChild('sstreets', { read: ElementRef })  sstreets!: ElementRef;
  @ViewChild('ccities', { read: ElementRef })  ccities!: ElementRef;





  public Add(){

    this.InsertForm = true;
  }

   selectedDriver: IPizzaKind = {} ;
   /* datasource: Driver[] = []; */
   datasource: IPizzaKind[] = [];

   totalRecords: number = 0;
   InsertForm:boolean = false;
   public Cities:any;
   constructor(
    public empLoginDataService: EmpLoginDataService,
    public dialog: MatDialog,
    public empDialog: MatDialog,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    public driverService: DriverService){


    setTimeout(() => {

      this.driverService.getdriversLarge();
       /* ((data: any) => {this.datasource =  data;  this.totalRecords = this.datasource.length }); */

      /* .then((_drivers) => {
        this.datasource = _drivers;
        this.totalRecords = this.datasource.length;
      }); */

        this.driverService.getCities();
        this.driverService.getStreets();

    }, 0);


    this.cols = [
      { field: 'Name', header: 'Name', width: '30%' },
      { field: 'Id', header: 'Id', width: '11%' },
      { field: 'Street', header: 'Street', width: '-3%' },
      { field: 'City', header: 'City' },
    ];

    this.loading = true;
    setTimeout(() => {
      this.placeholderText = 'It has changed';
    }, 5000);
  }

  placeholderText = 'Select Option';

  loading: boolean = false;
  pageSizeOptions = [10, 25, 50, { showAll: 'All' }];
  disable = false;
  title = 'tt3';
  keyword = "Name";

  /*public Cities;   = [
    { id: 1, name: "Tel Aviv" },
    { id: 2, name: "Jerusalrm" },
    { id: 3, name: "Ashdod" },
    { id: 4, name: "Hifa" },
    { id: 5, name: "Naharia" },
   ]; */
   /* public Streets = [
    { id: 1, name: "Herzel" },
    { id: 2, name: "Haashiryon" },
    { id: 3, name: "Hashita" },
    { id: 4, name: "Hagalim" },
    { id: 5, name: "Haogen" },
   ]; */


   /* public _drivers: Driver[] = []; */
   public _drivers: IPizzaKind[] = [];

   public cols = [
    { field: 'Name', header: 'Name', width: '30%' },
    { field: 'Id', header: 'Id', width: '11%' },
    { field: 'Street', header: 'Street', width: '-3%' },
    { field: 'City', header: 'City' },
  ];

  street = "";
   selectEvent(item={name:''}) {
    this.street = item['name'];
  }

  city = '';
  selectEvent2(ite={name:''}) {
    this.city = ite['name']
  }

  onChangeSearch(val: string) {
  }

  onFocused(e:any) {
  }
  loadDriversLazy(event: { first: any; rows: any; }) {
    this.loading = true;
     setTimeout(() => {
      if (this.datasource) {
        this._drivers = this.datasource.slice(
          event.first,
          event.first + event.rows
        );
        this.loading = false;
      }
    }, 1000);
  }

  buttonClick() {
    console.log('button clicked!');
  }

  insert(){

    let bbb = {name: this.nname.nativeElement.value,  id: this.iid.nativeElement.value,
    street: this.street, city: this.city };
    console.log(bbb);

   this._drivers.push(
    { Name: this.nname.nativeElement.value ,
      Desc: this.nname.nativeElement.value ,
      Price: this.nname.nativeElement.value }
   )


  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.InsertForm = false;
    }
}

 /* displayedColumns: string[] = ['Name', 'Desc', 'Price', 'action'];
 dataSource = new MatTableDataSource<any>();
 isLoading = true;
 pageNumber: number = 1;
 VOForm: any ; */
  isEditableNew: boolean = true;

  ngOnInit(): void {

    this.openDialog();
    this.driverService.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

setTimeout(() => {
  this.driverService.VOForm = this.fb.group({
    VORows: this.fb.array( this.driverService.PizzaList.map( (val:any) => this.fb.group({
            /* VORows: this.fb.array(  ELEMENT_DATA.map(val => this.fb.group({ */

              Name: new FormControl(val.Name),
              Desc: new FormControl(val.Desc),
              Price: new FormControl(val.Price),
              action: new FormControl('existingRecord'),
              isEditable: new FormControl(true),
              isNewRow: new FormControl(false),
            })
            )) //end of fb array
          }); // end of form group cretation
  this.driverService.isLoading = false;
  this.driverService.dataSource = new MatTableDataSource((this.driverService.VOForm.get('VORows') as FormArray).controls);
  this.driverService.dataSource.paginator = this.paginator;

  const filterPredicate = this.driverService.dataSource.filterPredicate;
    this.driverService.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.driverService.dataSource, data.value, filter);
    }

}, 200);

      //Custom filter according to name column
    // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
    //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  @ViewChild(MatPaginator) paginator: any;

goToPage() {
    this.paginator.pageIndex = this.driverService.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }
  ngAfterViewInit() {
    this.driverService.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');

   this.onPaginateChange(this.paginator, this.paginatorList);

   this.paginator.page.subscribe(() => { // this is page change event
     this.onPaginateChange(this.paginator, this.paginatorList);
   });
  }

   applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.driverService.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    // this.getBasicDetails();
    const control = this.driverService.VOForm.get('VORows') as FormArray;
    control.insert(0,this.initiateVOForm());
    this.driverService.dataSource = new MatTableDataSource(control.controls)
    // control.controls.unshift(this.initiateVOForm());
    // this.openPanel(panel);
      // this.table.renderRows();
      // this.dataSource.data = this.dataSource.data;
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement:any, i:any) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement:any, i:any) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);

    this.driverService.dataSource.data.push(
      { Name:this.driverService.dataSource.data[this.driverService.dataSource.data.length-1].controls.Name.value,
        Desc:this.driverService.dataSource.data[this.driverService.dataSource.data.length-1].controls.Desc.value,
        Price:this.driverService.dataSource.data[this.driverService.dataSource.data.length-1].controls.Price.value,
      }
    )

  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement:any, i:number) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }


paginatorList: any; // HTMLCollectionOf<Element> =;
idx: number = -1;
onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
     setTimeout((idx:any) => {
         let from = (paginator.pageSize * paginator.pageIndex) + 1;

         let to = (paginator.length < paginator.pageSize * (paginator.pageIndex + 1))
             ? paginator.length
             : paginator.pageSize * (paginator.pageIndex + 1);

         let toFrom = (paginator.length == 0) ? 0 : `${from} - ${to}`;
         let pageNumber = (paginator.length == 0) ? `0 of 0` : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
         let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

         if (list.length >= 1)
             list[0].innerHTML = rows;

     }, 0, paginator.pageIndex);
}


  initiateVOForm(): FormGroup {
    return this.fb.group({

      position: new FormControl(234),
                Name: new FormControl(''),
                Desc: new FormControl(''),
                Price: new FormControl(''),
                isEditable: new FormControl(false),
                isNewRow: new FormControl(true),
    });
  }

/*   openDialog(): void {
    const dialogRef = this.dialog.open(EmpLoginComponent,{
      width: '640px',disableClose: true
    });
} */

openDialog(): void {
  const dialogRef = this.dialog.open(ModalComponent, { disableClose: true ,
    width: '300px',
    height: '300px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    /* alert(this.empLoginDataService.loginData.password); */
/*     this.email = result; */
  });
}

clientFlg:boolean = false;
}




