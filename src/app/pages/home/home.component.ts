import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

import { BandsService } from '../../services/bands.service';
import { Band } from '../../interfaces/band';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class HomeComponent implements OnInit {

  
  dataSource: MatTableDataSource<Band>;
  columnsToDisplay: string[] = ['nombre', 'periodo', 'origen'];

  expandedElement: Band;


  constructor( private bandsService: BandsService, private router: Router ) { }

  ngOnInit(): void {

    if( localStorage.getItem('bands') ) {
      this.dataSource = new MatTableDataSource( this.bandsService.getLocalStorage() );
    } else {
      this.getDataBands();
    }

  }


  getDataBands() {

    this.bandsService.getBands().subscribe( bands => {
      this.dataSource =  new MatTableDataSource( bands );
    });

  }

  applyFilter( event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToAdd() {
    this.router.navigateByUrl('/add');
  }

  goToEdit( id:string ) {
    this.router.navigateByUrl('/edit/'+id);
  }

  deleteBand( id:string ) {

    const dataBand: Band[] = this.bandsService.getLocalStorage();
    const index = dataBand.findIndex( element => element.id == id);
    
    dataBand.splice(index, 1);

    this.bandsService.setLocalStorage(dataBand);

    this.dataSource =  new MatTableDataSource( this.bandsService.getLocalStorage() );
  }

}
