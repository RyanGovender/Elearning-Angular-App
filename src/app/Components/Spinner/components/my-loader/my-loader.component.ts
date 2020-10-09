import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/Services/services/loader.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;
  constructor(private loaderService: LoaderService) { 
    console.log('in here');
    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }

  ngOnInit(): void {
  }

}
