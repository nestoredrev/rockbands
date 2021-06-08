import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Band } from '../../interfaces/band';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  findBand: Band;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    const { id } = this.activatedRoute.snapshot.params;
    const getBands = JSON.parse(localStorage.getItem('bands'));
    this.findBand = getBands.find( element => element.id == id);
  }

}
