import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { EventService } from '../../core/services/event.service';

import { Router, NavigationEnd } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MENU, MENUvisiteur} from './menu';
import { MENUAdmin } from './menu';

import { MenuItem } from './menu.model';
import {AnnonceServiceService} from "../../core/services/annonce-service.service";
import {UtilisateurServiceService} from "../../core/services/utilisateur-service.service";
import {Utilisateur} from "../../core/models/utilisateur.model";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import Swal from "sweetalert2";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {StorageService} from "../../core/services/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService]
})

/**
 * Header Component
 */
export class HeaderComponent{
  mode: string | undefined;
  loginPassfield!: boolean;
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  password!: string;
  menuItems: MenuItem[] = [];
  menuAdminItems: MenuItem[] = [];
  MenuVisiteur: MenuItem[] = [];
  //  Validation form
  signUpform!: UntypedFormGroup;
  signInform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  public submitted = true;

  isLoginFailed = false;
  roles: string[]=[];
  utilisateur:Utilisateur = new Utilisateur();

  @ViewChild('sideMenu') sideMenu!: ElementRef;

  constructor(private utilisateurServiceService:UtilisateurServiceService,public tokenStorage : TokenStorageService,private storage : StorageService,private router: Router,private modalService: NgbModal,private jwtHelper: JwtHelperService, private eventService: EventService, private formBuilder: UntypedFormBuilder) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });
  }

  ngOnInit(): void {
    //localStorage.clear();
    /**
     * Bootstrap validation form data
     */
     this.signInform = this.formBuilder.group({
       nomUtilisateur: ['', [Validators.required]],
       password: ['', [Validators.required]],
    });

    /**
     * Bootstrap validation form data
     */
     this.signUpform = this.formBuilder.group({
       nom: ['', [Validators.required,Validators.minLength(3)]],
       nomUtilisateur: ['', [Validators.required,Validators.minLength(3)]],
       adresse: ['', [Validators.required]],
       type_utilisateur:['',[Validators.required]],
       genre: ['', [Validators.required]],
       etatCivil: ['', [Validators.required]],
       numTel: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
       dateDeNaissance:['', [Validators.required]],
       email: ['', [Validators.required,Validators.email]],
       password: ['', [Validators.required,Validators.minLength(4)]],
     //   confirmPassword: new FormControl('', Validators.nullValidator),
     // }, { validators: this.passwordMatchValidator
     });


    // Menu Items
    this.menuItems = MENU;
    this.menuAdminItems = MENUAdmin;
    this.MenuVisiteur = MENUvisiteur;
  }

  Inscription(): void {
    if (this.signUpform.valid) {
      this.utilisateurServiceService.inscription({...this.utilisateur, ...this.signUpform?.value})
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          }
          // error: (e) => console.error(e)
        });
    }
  }

  validSubmit() {
    if (this.signInform.valid) {
      this.submit = true;
      console.log(this.form)
      //const {nomUtilisateur, password } = this.form;
      const nomUtilisateur = this.form['nomUtilisateur']["value"]
      const password = this.form['password']["value"]

      this.utilisateurServiceService.login(nomUtilisateur, password).subscribe({
        next: data => {
          if (data['currentUser']['active']) {
            this.tokenStorage.saveToken(data["token"]);
            this.tokenStorage.saveUser(data["currentUser"]);
            this.isLoginFailed = false;
            this.roles = this.tokenStorage.getUser().roles;
          } else {
            console.error( Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Vous êtes bloqué(e)',
              showConfirmButton: false,
              timer: 3000
            }))
          }
        },
        error: (e) => console.error(Swal.fire('Oops', "Information incorrectes", 'error'))
      });
    }
  }

  sedeconnecter(dec?:any)
  {
    dec=!this.utilisateur.isConnected && localStorage.clear();
    return dec;
  }

   /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar');
    if (document.documentElement.scrollTop > 40) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
   toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'lg', centered: true });
  }
  toggleModal2(staticDataModal: any) {
    if(this.signUpform.valid || this.signInform.valid) {
      this.modalService.dismissAll(staticDataModal);
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Vérifiez les champs',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  secondModal(toggleSecondModal: any) {
    this.modalService.open(toggleSecondModal, { size: 'lg', centered: true });
  }

  /**
   * Password Hide/Show
   */
   toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  /**
   * Password Hide/Show
   */
   toggleSignUpPassField() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
   * Password Hide/Show
   */
   toggleSignUpCPassField() {
    this.signupCPassfield = !this.signupCPassfield;
  }


   /**
  * On menu click
  */
    onMenuClick(event: any) {
      const nextEl = event.target.nextElementSibling;
      if (nextEl) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove('show');
        }
        nextEl.classList.toggle('show');
      }
      return false;
    }

    ngAfterViewInit() {
      this.activateMenu();
    }

    /**
    * Activates the menu
    */
    private activateMenu() {
      const resetParent = (el: any) => {
        const parent = el.parentElement;
        if (parent) {
          parent.classList.remove('active');
          const parent2 = parent.parentElement;
          this._removeAllClass('mm-active');
          this._removeAllClass('mm-show');
          if (parent2) {
            parent2.classList.remove('active');
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove('active');
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove('active');
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.remove('active');
                  const menuelement = document.getElementById(
                    'topnav-menu-content'
                  );
                  if (menuelement !== null)
                    if (menuelement.classList.contains('show'))
                      document
                        .getElementById('topnav-menu-content')!
                        .classList.remove('show');
                }
              }
            }
          }
        }
      };

      // activate menu item based on location
      const links: any = document.getElementsByClassName('side-nav-link-ref');
      let matchingMenuItem = null;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < links.length; i++) {
        // reset menu
        resetParent(links[i]);
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < links.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (location.pathname === links[i]['pathname']) {
          matchingMenuItem = links[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const parent = matchingMenuItem.parentElement;
        if (parent) {
          parent.classList.add('active');
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.add('active');
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add('active');
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add('active');
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.add('active');
                }
              }
            }
          }
        }
      }
    }

    /**
    * remove active and mm-active class
    */
    _removeAllClass(className: any) {
      const els = document.getElementsByClassName(className);
      while (els[0]) {
        els[0].classList.remove(className);
      }
    }

    /**
    * Topbar Light-Dark Mode Change
    */
    changeMode(mode?: string) {
      this.mode = mode;
      this.eventService.broadcast('changeMode', mode);

      switch (mode) {
        case 'light':
          document.body.setAttribute('data-layout-mode', "light");
          document.body.setAttribute('data-sidebar', "light");
          break;
        case 'dark':
          document.body.setAttribute('data-layout-mode', "dark");
          document.body.setAttribute('data-sidebar', "dark");
          break;
        default:
          document.body.setAttribute('data-layout-mode', "light");
          break;
      }
    }

     /**
  * Returns true or false if given menu item has child or not
  * @param item menuItem
  */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * On mobile toggle button clicked
   */
   toggleMobileMenu() {
    if (window.screen.width <= 1024) {
      document.getElementById('navbarNav')?.classList.toggle('show');
    }
  }

   /**
  * Bootsrap validation form submit method
  */


    /**
   * Returns form
   */
    get form() {
      return this.signInform.controls;
    }

  /**
   * Bootstrap tooltip form validation submit method
   */
   formSubmit() {
     if(this.signUpform.valid) {
       this.Inscription();
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Bienvenue sur WheelWorld',
         showConfirmButton: false,
         timer: 4000
       })
     }
  }

  /**
   * returns tooltip validation form
   */
   get formData() {
    return this.signUpform.controls;
  }

   /**
  * Demos Onclick
  */
  demosDroupDownClick() {
    document.querySelector('.demos')?.classList.toggle('show');
  }

}
