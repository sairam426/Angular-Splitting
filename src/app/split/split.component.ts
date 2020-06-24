import { DocumentService } from './../service/document.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LookupsService } from '../service/lookups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit {
  splitImageList : any = []
  DocumentList : any = []
  DocumentSubList : any = []
  previewImage : any = []
  pageIds : any = []
  mergeData : any = {}
  todo: any = []
  done = [];
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  overlay = false;
  
  drop(event: CdkDragDrop<string[]>) {
    {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
    }
  }

  document:any;
 
  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private docService:DocumentService,
    private _lookups:LookupsService,
    private _snackBar: MatSnackBar,
    private commonService:CommonService,
  ) { 
     
  }



  ngOnInit(): void {
    this.document=history.state;
   
    if(!this.document.documentId ){
      this.router.navigateByUrl('/document');
    }

    if(this.document.documentId){
      this.overlay = true;
      this.getSplitImages()
      this.getLookups()
    }
    
  }

  getSplitImages(){
    this.mergeData.applicationNbr = this.docService.getApplicationNumber();
    this.mergeData.documentId = this.document.documentId
    this.docService.getSplitDocumentFile(this.mergeData.applicationNbr,this.document.id).subscribe(data => {
      this.todo = data;
      this.overlay = false;
    },
    error  => {
      this.overlay = false;
      this.commonService.openSnackBar(error.error.message, 'ERROR');
    })
  }

  getLookups(){
    this._lookups.getDocType().subscribe(data => {      
      let summary = data['LookupsResponse']['LookupsSummary']
      summary.forEach(element => {
        if(element.Type == 'DOCUMENT_TYPE_CD'){
          this.DocumentList = element.Lookups;
        }
      });      
    },
    error  => {
     
    })

    this._lookups.getDocSubType().subscribe(data => {      
      let summary = data['LookupsResponse']['LookupsSummary']
      summary.forEach(element => {
        if(element.Type == 'DOCUMENT_SUB_TYPE_CD'){
          this.DocumentSubList = element.Lookups;
        }
      });      
    },
    error  => {
     
    })
  }

  previewImg(data){    
    this.previewImage = data  
  }

  save(){
    // this.openSnackBar("Hiii", "success")
    if(!this.mergeData.documentType){
      this.openSnackBar("Please Select Document Type", "Required")
      return
    }
    if(!this.mergeData.documentSubType){
      this.openSnackBar("Please Select Document Sub-Type", "Required")
      return
    }
    if(!this.mergeData.documentName){
      this.openSnackBar("Please Select Document Name", "Required")
      return
    }
    if(this.done){
      this.mergeData.pageIds = [];
      this.done.forEach(row => {
        this.mergeData.pageIds.push(row.pageNumber)
      })
      this.docService.merge(this.mergeData).subscribe(data => {
        this.openSnackBar(data['message'], data['status'])
        if(data['status'] == 'SUCCESS'){
          this.router.navigateByUrl('/document');
        }
      },
      error  => {
        // this.openSnackBar(data['message'], data['status'])
      })
    }
  }

  validate(){
    return false;
  }

  openSnackBar(message, success) {
    this._snackBar.open(message, success, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  } 

}
