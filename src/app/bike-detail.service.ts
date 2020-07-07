import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BikeDetailService {
  name: string;
  maker: string;
  weight: number;
  bclass: number;
}
