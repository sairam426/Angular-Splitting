import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, DoCheck } from '@angular/core';
// import { ProgressSpinnerMode, ThemePalette } from '@angular/material';
import { OverlayRef } from '@angular/cdk/overlay';

// import { OverlayService, AppOverlayConfig } from '../overlay/overlay.module';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent {
  @Input() value : number = 100;
  @Input() diameter: number = 100;
  @Input() mode : string ="indeterminate";
  @Input() strokeWidth : number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  constructor() { }
  ngOnInit() {
    // Config for Overlay Service
   
  }
  
}