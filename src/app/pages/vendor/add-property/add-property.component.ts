import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EventService} from '../../../core/services/event.service';
import {Annonce} from "../../../core/models/annonce.model";
import {AnnonceServiceService} from "../../../core/services/annonce-service.service";
import {HttpClient} from "@angular/common/http";
import {FileHandle} from "../../../core/models/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Images} from "../../../core/models/image.model";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

/**
 * AddProperty Component
 */
export class AddPropertyComponent implements OnInit {

  showSuccess = false;



    // bread crumb items
    breadCrumbItems!: Array<{}>;

    public overviewColleaps = true;
    public amenitiesColleaps = true;
    public submitted = false;

  //add property
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  imageName: any;

  userFile: any ;
  public imagePath: any;
  imgURL: any;
  message!: string;
  // annonce:Annonce = new Annonce();
  // appartement:Appartement = new Appartement();
  // maison:Maison = new Maison();
  // ferme:Ferme = new Ferme();
  // immeuble:Immeuble = new Immeuble();
  // local:Local = new Local();
  // terrain:Terrain = new Terrain();

  annonce:Annonce = new Annonce();
  images:Images = new Images();
  annonceForm:FormGroup;

  onsubmit!: boolean;

  // bread crumb items

    constructor(private annonceService:AnnonceServiceService , private modalService: NgbModal, private sanitizer:DomSanitizer,private router:Router,private annonceBuilder: FormBuilder,public tokenStorage:TokenStorageService) {
      //console.log('appartement',this.appartement)
      }

  ngOnInit(): void {

     this.breadCrumbItems = [
      { label: 'Accueil', link:'' },
      { label: 'Ajouter une annonce', active: true }
    ];

    this.annonceForm = this.annonceBuilder.group({
      titre: ['', Validators.required],
      categorie: ['', Validators.required],
      nbChevaux: ['', Validators.required],
      nbCylindres: ['', Validators.required],
      nbPorte: ['', Validators.required],
      boiteVitesse: ['', Validators.required],
      typeVehicule: ['', Validators.required],
      kilometrage: ['', Validators.required],
      marque: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  saveAnnonce(): void {
    this.annonce.utilisateur=this.tokenStorage.getUser();
    let annonce = {...this.annonce,...this.annonceForm?.value}
    this.annonceService.addAnnonce(annonce)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }




  inView(ele:any){
    ele.scrollIntoView({behavior:"smooth", block:"start", inline:"start"})
  }

  /**
   * Open Review modal
   * @param reviewContent modal content
   */

   openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { size: 'fullscreen', windowClass: 'modal-holder' });
  }

  selectRegion(region:any) {
    console.log('region',region)
  }


  onSelectFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.images = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  get formData() {
    return this.annonceForm.controls;
  }

  onSubmit() {
    if (this.annonceForm.valid) {
      console.log(this.annonceForm);
        this.saveAnnonce();
        this.router.navigate(['']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Votre aannonce a été ajouté avec succés',
          showConfirmButton: false,
          timer: 3000
        })
      }else
      {
        Swal.fire('Oops',"Votre annonce n'a pas été ajouté",'error')
      }
  }
}
