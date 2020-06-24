import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private ApplicationNumber:string='0000001065'; 
  private DocumentId;

  constructor(
    private commonService:CommonService,
    private http:HttpClient,
  ) { 
    
  }
  
  private headerOption = {
    headers: new HttpHeaders({
      'Authorization': this.commonService.basicAuth(),
    })
  };

  private headerOptionPdf = {
    headers: new HttpHeaders({
      'Authorization': this.commonService.basicAuth(),
      'Content-Type': 'application/pdf', 
    })
  };

  getDocuments(number){
    let _url: string = "/documents/"+number
    return this.http.get(
      this.commonService.baseURL()+_url, this.headerOption);
  }

  getSplitDocumentFile(number,id){
    let _url: string = "/documents/split/"+id;
    return this.http.get(
      this.commonService.baseURL()+_url, this.headerOption);
  }

  getApplicationNumber(){
    return this.ApplicationNumber
  }

  getDocumentId(){
    return this.DocumentId;
  }

  setDocumentId(number){
    this.DocumentId = number;
  }

  merge(data){
    let _url: string = "/documents/merge";
    return this.http.post(
      this.commonService.baseURL()+_url, data, this.headerOption);
  }
}
