import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _snackBar: MatSnackBar
  ) { }

  baseURL() { 
    // return "https://48elj40d9i.execute-api.us-east-1.amazonaws.com/preprod/OfsllRestWS/service/api/resources"; 
    return "http://localhost:9012";
  }

  baseURL2() { 
    return "https://48elj40d9i.execute-api.us-east-1.amazonaws.com/preprod/OfsllRestWS/service/api/resources"; 
  }

  basicAuth(){
    return 'Basic ' + window.btoa('PAVAN:PAVAN*123');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      // duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
