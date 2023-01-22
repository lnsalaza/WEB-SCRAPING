import { Component, OnInit, ViewChild } from '@angular/core';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-question3',
  templateUrl: './question3.component.html',
  styleUrls: ['./question3.component.css']
})
export class Question3Component implements OnInit {

  answer:any = {}
  
  control = false;


  ngOnInit(): void {
    
    
    
  }

  csvRecords: any;;
  header: boolean = true;

  constructor(private ngxCsvParser: NgxCsvParser) {
   
    
  }
  
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });

      
  }

  startAnalisis(){

    
    let result = this.csvRecords.filter( (x: { TITULO: String; }) => x.TITULO.includes('Samborondón'))
    this.answer = this.getMax(result, "PRECIO")
    console.log(this.answer);
    this.control = true;
  }
  
  getMax(arr:any, key:any) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][key]) > parseInt(max[key]))
            max = arr[i];
    }
    return max;
  }



}
