import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BikeDataService {
  name: string;
  maker: string;
  weight: number;
  bclass: number;
  datas: string[];
}
