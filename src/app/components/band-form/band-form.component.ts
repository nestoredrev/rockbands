import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Band } from 'src/app/interfaces/band';
import { Router } from '@angular/router';
import { BandsService } from 'src/app/services/bands.service';

@Component({
  selector: 'app-band-form',
  templateUrl: './band-form.component.html',
  styleUrls: ['./band-form.component.css']
})

export class BandFormComponent implements OnInit {

  formAddBand:FormGroup;
  miembros: string[] = [];
  @Input() bandEdit: Band;

  // Autoajuste para el textArea
  @ViewChild('autosize',{static:false}) autosize: CdkTextareaAutosize;

  constructor( private formBuild: FormBuilder, 
               private router: Router,
               private bandsService: BandsService ) { }

  ngOnInit(): void {
    this.createFormBand();

    if(this.bandEdit) {
      this.initFormBand();
    }
  }

  createFormBand() {
    this.formAddBand = this.formBuild.group({
      id: [''],
      nombre: ['', Validators.required],
      origen: [''],
      periodo: [''],
      miembros: [''],
      youtubeId: ['', Validators.maxLength(11)],
      descripcion: ['', [Validators.required, Validators.maxLength(256)]],
    })
  }

  initFormBand() {
    this.formAddBand.setValue(this.bandEdit);
    this.miembros = this.bandEdit.miembros;
  }


  addMember(evento:Event, miembro:string) {
    evento.preventDefault();
		this.miembros.push(miembro);
	}

    deleteMember( idx:number ) {
      this.miembros.splice(idx, 1);
	} 

  onSubmit() {
    const newBand = this.formAddBand.value;
    const actualyBands: Band[] = this.bandsService.getLocalStorage();
    const newId = actualyBands.length + 1;

    // Editar
    if(this.bandEdit) {

      const id = this.bandEdit.id;
      const index = actualyBands.findIndex( element => element.id == this.bandEdit.id);
      actualyBands.splice(index, 1);

      newBand.id = id;
      newBand.miembros = this.miembros;
      actualyBands.push(newBand);
      this.bandsService.setLocalStorage(actualyBands);
      this.router.navigateByUrl('/');  

    } else {
      // Añadir una banda nueva
      newBand.id = newId;
      newBand.miembros = this.miembros;
      actualyBands.push(newBand);
      this.bandsService.setLocalStorage(actualyBands);
      this.router.navigateByUrl('/');  
    } 
  }
}
