import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Band } from '../../interfaces/band';
import { BandsService } from '../../services/bands.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  findBand: Band;

  constructor(private activatedRoute: ActivatedRoute, private bandsService: BandsService) { }

  ngOnInit(): void {
    
    const { id } = this.activatedRoute.snapshot.params;
    const getBands = this.bandsService.getLocalStorage();
    this.findBand = getBands.find( (element:Band) => element.id == id);
  }

}
