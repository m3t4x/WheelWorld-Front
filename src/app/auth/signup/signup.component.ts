import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {UtilisateurServiceService} from "../../core/services/utilisateur-service.service";
import {Utilisateur} from "../../core/models/utilisateur.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

/**
 * Signup Component
 */
export class SignupComponent implements OnInit {

  passTextType!: boolean;
  fieldTextType!: boolean;
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;

  public submitted = true;
  submit!: boolean;
  formsubmit!: boolean;
  utilisateur:Utilisateur = new Utilisateur();

  constructor(private utilisateurServiceService:UtilisateurServiceService,private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
    this.signUpform = this.formBuilder.group({
      nom: ['', [Validators.required]],
      nomUtilisateur: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      etatCivil: ['', [Validators.required]],
      numTel: ['', [Validators.required]],
      dateDeNaissance:['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator });


    document.body.classList.add('bg-secondary');

  }


  Inscription(): void {
    this.utilisateurServiceService.inscription({...this.utilisateur, ...this.signUpform?.value})
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submit = true;
        },
        error: (e) => console.error(e)
      });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null; // Passwords match, validation successful
    } else {
      return { mismatch: true }; // Passwords don't match, validation error
    }
  }


  /**
   * Password Hide/Show
   */
   togglePassFieldTextType() {
    this.passTextType = !this.passTextType;
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

   /**
  * Bootsrap validation form submit method
  */
    validSubmit() {
      this.submit = true;
    }

  formSubmit() {
    this.Inscription();
  }

  get formData() {
    return this.signUpform.controls;
  }

    /**
   * Returns form
   */
    get form() {
      return this.validationform.controls;
    }

}
