import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Chart, Colors } from 'chart.js/auto';



@Component({
  selector: 'app-question5',
  templateUrl: './question5.component.html',
  styleUrls: ['./question5.component.css']
})
export class Question5Component implements OnInit {

  answer:any;
  csvRecords: Array<any> = [];
  header: boolean = true;
  listo : boolean = false;
  ciudades : Array<String> = ['Guayaquil', 'Quito', 'Cuenca'];
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

    let promediosXciudad = this.calcularpromedioPorCiudad(this.ciudades)
    this.answer = this.obtenerMayorpromedio(promediosXciudad)

    let promedios:Array<number> = [];
    promediosXciudad.forEach(analisis => {
      promedios.push(analisis.promedio);
    })

    this.createChart(this.ciudades, promedios)
    this.listo  = true

  }

  calcularpromedioPorCiudad(ciudades:Array<any>){
    let analisis: Array<any> = [];
    ciudades.forEach(ciudad => {
      let precioTotal = 0;
      let nullPrice = 0;

      this.csvRecords.forEach(casa => {
        if (casa.precio && casa.localización && (casa.localización.includes(ciudad))){
          precioTotal += parseInt(casa.precio.split(' ')[1].replace('.', ''));
        } else {
          nullPrice++
        }
      });
      
      let promedio = Math.round(precioTotal/(this.csvRecords.length-nullPrice));
      analisis.push({
        ciudad : ciudad,
        promedio : promedio
      });


    });

    return analisis;
  }

  obtenerMayorpromedio(promedioPorCiudad : Array<any>){
    let mayorPromedio:any = promedioPorCiudad[0]

    promedioPorCiudad.forEach(ciudad => {
      if (parseInt(ciudad.promedio) > parseInt(mayorPromedio.promedio)) {
        mayorPromedio = ciudad;
      }
    });
    return mayorPromedio;
  }

  //, promedios:Array<any>
  createChart(ciudades:Array<any>, promedios:Array<any>){

    this.chart = new Chart("Chart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ciudades, 
	       datasets: [
          {
            label: 'Promedio',
            data: promedios
          },  
        ]
      },
      options: {
        aspectRatio:3,
      }
    });
  }


}
