import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-question2',
  templateUrl: './question2.component.html',
  styleUrls: ['./question2.component.css']
})
export class Question2Component implements OnInit {

  answer = {
    nombre: "",
    banios: 0,
    imagen: ""

  }
  
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

    
    let guayaquilArray = this.csvRecords.filter( (x: { TITULO: String; }) => x.TITULO.includes('Guayaquil'))
    let samborondonArray = this.csvRecords.filter( (x: { TITULO: String; }) => x.TITULO.includes('Samborondón'))

    let guayaqulResults  = this.getCostBenefist(guayaquilArray, "BANIO");
    let samborondonResults  = this.getCostBenefist(samborondonArray, "BANIO");

    this.control = true;

    this.answer = this.getAnswer({nombre:"Guayaquil", value:guayaqulResults}, {nombre:"Samborondon", value:samborondonResults})

  }
  
  getCostBenefist(arr:any, key:any) {
    var costBenefist = 0;
  
    for (var i=0 ; i<arr.length ; i++) {
      costBenefist += parseInt(arr[i][key]);
    }
    return Math.round(costBenefist/arr.length)
  }

  getAnswer(varA:{nombre:string, value:number}, varB:{nombre:string, value:number}){
    let imageUrl = "../assets/images/"
    let answer = {
      nombre: "",
      banios: 0,
      imagen: ""
    }
    if (varA.value < varB.value) {
      answer.banios = varA.value
      answer.nombre = varA.nombre
      answer.imagen = imageUrl + varA.nombre + ".png"
    }else{
      answer.banios = varB.value
      answer.nombre = varB.nombre
      answer.imagen = imageUrl + varB.nombre + ".png"
    }
    return answer;
  }

}
