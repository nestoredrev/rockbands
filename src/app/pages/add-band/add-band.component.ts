import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Band } from 'src/app/interfaces/band';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-band',
  templateUrl: './add-band.component.html',
  styleUrls: ['./add-band.component.css']
})
export class AddBandComponent implements OnInit {

  formAddBand:FormGroup;
  miembros: string[] = [];

  // Autoajuste para el textArea
  @ViewChild('autosize',{static:false}) autosize: CdkTextareaAutosize;

  constructor( private formBuild: FormBuilder, private router: Router ) { }

  ngOnInit(): void {
    this.createFormBand();
  }

  createFormBand() {
    this.formAddBand = this.formBuild.group({
      id: [''],
      nombre: ['', Validators.required],
      origen: [''],
      periodo: [''],
      miembros: this.formBuild.array([]),
      youtubeId: ['', Validators.maxLength(11)],
      descripcion: ['', [Validators.required, Validators.maxLength(256)]],
    })
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
    const actualyBands: Band[] = JSON.parse(localStorage.getItem('bands'));
    const newId = actualyBands.length + 1;
    
    newBand.id = newId;
    newBand.miembros = this.miembros;
    actualyBands.push(newBand);
    localStorage.setItem('bands', JSON.stringify(actualyBands));
    this.router.navigateByUrl('/');


  
  }

}
