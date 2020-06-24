import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface Document {
  documentId: number;
  fileType:string;
  documentName: string;
  fileName: string;
  pageNumber:number;
}

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['documentId','fileType','fileName','pageNumber', 'action'];
  documentDetails:any=[]
  dataSourceDocument:any;
  overlay = false;
  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private docService:DocumentService,
  ) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  onAction(row){
    this.router.navigateByUrl('/split', { state:row });
    
  }

  getDocuments(){
    this.overlay = true;
    let applicationNumber = this.docService.getApplicationNumber();
    this.docService.getDocuments(applicationNumber).subscribe(data => {
      if(data){
        // this.dataSourceDocument = []
        this.documentDetails = data;
        this.dataSourceDocument = this.documentDetails;
        if(this.dataSourceDocument != undefined){
          this.dataSourceDocument.sort = this.sort;
          this.dataSourceDocument.paginator = this.paginator;
        }     
      }
      this.overlay = false;
    },
    error  => {
      this.overlay = false;
    })
  }


}


