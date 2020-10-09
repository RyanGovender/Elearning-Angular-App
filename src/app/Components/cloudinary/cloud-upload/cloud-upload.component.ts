import { Component, OnInit,Renderer2, Inject, ElementRef, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cloud-upload',
  templateUrl: './cloud-upload.component.html',
  styleUrls: ['./cloud-upload.component.css']
})
export class CloudUploadComponent implements OnInit {

  @Input() imageData:any;
  constructor( 
    ) { }

  ngOnInit(): void {
     console.log(this.imageData);

  }

}
