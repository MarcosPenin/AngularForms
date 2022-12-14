import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent   {

  miFormulario:FormGroup=this.fb.group({
    nombre: ["RTX 4080ti",[Validators.required,Validators.minLength(3)]],
    precio:[0,[Validators.required,Validators.min(0)]],
    existencias:[6,[Validators.required,Validators.min(0)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.miFormulario.reset({
      nombre:"RTX 4080ti",
      precio: 1600,
  
    })
  }


campoEsValido(campo:string){
  return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
}

guardar(){
  if(this.miFormulario.invalid){
   this.miFormulario.markAllAsTouched();
   return;
  }
  console.log(this.miFormulario.value)
  this.miFormulario.reset()
}

}
