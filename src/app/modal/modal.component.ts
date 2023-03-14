
import {EventEmitter, Output, Input,  Component, OnInit, Inject } from '@angular/core';
/* import { MatDialogRef, MAT_DIALOG_DATA, DialogData} from '@angular/material/dialog'; */
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { EmpLoginDataService } from '../emp-login-data.service';
interface DialogData {
  email: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    public empLoginDataService: EmpLoginDataService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    /* this.dialogRef.close(); */
  }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {


    if (this.form.valid) {
      this.empLoginDataService.loginData.password = this.form.value.password;
      this.empLoginDataService.loginData.username = this.form.value.username;
      this.dialogRef.close();
    }
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}

