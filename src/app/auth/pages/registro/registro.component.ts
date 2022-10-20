import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validator.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validator.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validator.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [this.validator.camposIguales('password', 'password2')]
  });

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'Email es obligatorio';
    } else if ( errors?.["pattern"] ) {
      return 'El valor ingresado no tiene formato de correo';
    } else if ( errors?.["emailOcupado"] ) {
      return 'Ese email ya existe';
    }

    return '';
  }



  constructor(private fb: FormBuilder, private validator: ValidatorService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'fernando_her85',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.touched
      && this.miFormulario.get('email')?.errors?.['required'];
  }

  guardar() {
    this.miFormulario.markAllAsTouched();
  }

}
