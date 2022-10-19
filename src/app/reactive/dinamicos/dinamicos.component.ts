import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array([
      [ 'Planescape: Torment', Validators.required ],
      [ 'Baldurs Gate',Validators.required  ],
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required );

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) { return; }

    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required ) );
    this.nuevoFavorito.reset();

  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
  }

  guardar() {
    
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    console.log(this.miFormulario.value);
  }

}
