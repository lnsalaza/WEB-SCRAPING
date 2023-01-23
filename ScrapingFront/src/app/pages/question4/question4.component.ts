import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Chart, Colors } from 'chart.js/auto';



@Component({
  selector: 'app-question4',
  templateUrl: './question4.component.html',
  styleUrls: ['./question4.component.css']
})
export class Question4Component implements OnInit {


  answer:any;
  csvRecords: Array<any> = [];
  header: boolean = true;
  listo : boolean = false;

  public chart: any;

  constructor(private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' }).pipe().subscribe({
      next: (result): void => {
        this.csvRecords = result as Array<any>;
      },
      error: (error: NgxCSVParserError): void => {
        console.log('Error', error);
      }
    });
  }

  startAnalisis(){

    if (this.chart) {
      this.chart.destroy();
    }
    let ciudades = this.obtenerCiudades();

    let tasaPorCiudad = this.calcularTasaPorCiudad(ciudades);
    this.answer = this.obtenerMenorTasa(tasaPorCiudad)
    this.listo = true;

    let tasas:Array<number> = [];
    tasaPorCiudad.forEach(analisis => {
      tasas.push(analisis.tasa);
    })

    this.createChart(ciudades, tasas)
    
    
  }

  obtenerCiudades(){
    let ciudades:Array<string> = []
    this.csvRecords.forEach(casa => {
      let ciudadArray = casa.localización.split('/')
      let ciudad = ciudadArray[ciudadArray.length - 2]
      if (ciudad && !ciudades.includes(ciudad)) {
        ciudades.push(ciudad);
      }
    })
    return ciudades;
  }

  calcularTasaPorCiudad(ciudades:Array<any>){
    let analisis: Array<any> = [];
    ciudades.forEach(ciudad => {
      let precioTotal = 0;
      let nullPrice = 0;

      this.csvRecords.forEach(casa => {
        if (casa.precio && casa.localización && (casa.localización.indexOf(ciudad)!= -1)){
          precioTotal += parseInt(casa.precio.split(' ')[1].replace('.', ''));
        } else {
          nullPrice++
        }
      });
      
      let tasa = (precioTotal/(this.csvRecords.length-nullPrice));
      analisis.push({
        ciudad : ciudad,
        tasa : tasa
      });
    });

    return analisis;
  }

  obtenerMenorTasa(tasaPorCiudad : Array<any>){
    let menorTasa:any = tasaPorCiudad[0]

    tasaPorCiudad.forEach(ciudad => {
      if (ciudad.tasa < menorTasa.tasa) {
        menorTasa = ciudad;
      }
    });

    return menorTasa;
  }

  //, tasas:Array<any>
  createChart(ciudades:Array<any>, tasas:Array<any>){

    this.chart = new Chart("Chart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ciudades, 
	       datasets: [
          {
            label: 'Promedio',
            data: tasas
          },  
        ]
      },
      options: {
        aspectRatio:2,
      }
    });
  }

  
}
