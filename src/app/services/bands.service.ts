import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Band } from '../interfaces/band';

import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  constructor(private http: HttpClient) { }

  getBands():Observable<Band[]> {
    return this.http.get<Band[]>("../assets/mocks/bandsDefault.json").pipe(
      map( res => {
        localStorage.setItem('bands', JSON.stringify(res));
        return res;
      })
    )
  }

}
