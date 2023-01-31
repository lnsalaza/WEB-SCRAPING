import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-question6',
  templateUrl: './question6.component.html',
  styleUrls: ['./question6.component.css']
})
export class Question6Component implements OnInit {

  answer:any;
  csvRecords: Array<any> = [];
  header: boolean = true;
  listo : boolean = false;

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
    let ciudades = this.obtenerCiudades();
    let promediosXciudad = this.calcularpromedioPorCiudad(ciudades);
    
    this.answer = this.obtenerMenorPromedio(promediosXciudad);
    this.listo = true;

  

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

  calcularpromedioPorCiudad(ciudades:Array<any>){
    let analisis: Array<any> = [];
    ciudades.forEach(ciudad => {
      let precioTotal = 0;
      let nullPrice = 0;


      this.csvRecords.forEach(casa => {
        if (casa.precio && casa.detalles.includes('habitaciones') && casa.localización.includes(ciudad)){
          let precio = parseInt(casa.precio.split(' ')[1].replace('.', ''));
          let habitaciones = parseInt(casa.detalles.split('/')[0]);
          precioTotal += (precio/habitaciones);
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

  obtenerMenorPromedio(promedioPorCiudad : Array<any>){
    let menorPromedio:any = promedioPorCiudad[0]
    promedioPorCiudad.forEach(ciudad => {
      if (parseInt(ciudad.promedio ) < parseInt(menorPromedio.promedio)) {
        menorPromedio = ciudad;
      }
    });
    return menorPromedio;
  }

}
