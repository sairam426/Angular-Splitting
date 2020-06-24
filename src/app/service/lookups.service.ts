import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(
      private http:HttpClient,
      private commonService:CommonService,
    ) { }

  private headerOption = {
    headers : new HttpHeaders({
      'Authorization' : this.commonService.basicAuth(),
      'Content-Type': 'application/json'
    })
  }

  getDocType(){
    let url  = '/setup/lookups?lookups?lookupsType=DOCUMENT_TYPE_CD&lookupsDesc=DOCUMENT TYPE CODES';
    return this.http.get(this.commonService.baseURL2()+url, this.headerOption);
  }

  getDocSubType(){
    let url  = '/setup/lookups?lookupsType=DOCUMENT_SUB_TYPE_CD&lookupsDesc=DOCUMENT SUB TYPE CODES';
    return this.http.get(this.commonService.baseURL2()+url, this.headerOption);
  }
  
}
