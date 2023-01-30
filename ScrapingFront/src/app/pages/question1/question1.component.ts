import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-question1',
  templateUrl: './question1.component.html',
  styleUrls: ['./question1.component.css']
})
export class Question1Component implements OnInit {

  answer = {
    nombre: "",
    costo_promedio: 0,
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

    
    let quitoArray = this.csvRecords.filter( (x: { TITULO: String; }) => x.TITULO.includes('Quito'))
    let cuencaArray = this.csvRecords.filter( (x: { TITULO: String; }) => x.TITULO.includes('Cuenca'))

    let quitoResults  = this.getCostBenefist(quitoArray, "PRECIO", "AREA");
    let cuencaResults  = this.getCostBenefist(cuencaArray, "PRECIO", "AREA");

    this.control = true;

    this.answer = this.getAnswer({nombre:"Quito", value:quitoResults}, {nombre:"Cuenca", value:cuencaResults})

  }
  
  getCostBenefist(arr:any, key:any, key2:any) {
    var costBenefist = 0;
  
    for (var i=0 ; i<arr.length ; i++) {
      let valueA = arr[i][key]
      let valueB = arr[i][key2]
      costBenefist += (valueA/valueB);
    }
    return parseFloat((costBenefist/arr.length).toFixed(2))
  }

  getAnswer(varA:{nombre:string, value:number}, varB:{nombre:string, value:number}){
    let imageUrl = "../assets/images/"
    let answer = {
      nombre: "",
      costo_promedio: 0,
      imagen: ""
    }
    if (varA.value < varB.value) {
      answer.costo_promedio = varA.value
      answer.nombre = varA.nombre
      answer.imagen = imageUrl + varA.nombre + ".png"
    }else{
      answer.costo_promedio = varB.value
      answer.nombre = varB.nombre
      answer.imagen = imageUrl + varB.nombre + ".png"
    }
    return answer;
  }

}
