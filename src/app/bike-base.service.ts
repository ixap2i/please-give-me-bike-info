import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BikeBaseService {
  name: string;
  color: string;
  distance: string;
  engine: string;
  status: string;
  place: string;
  price: string;
  imgUrl: string;
  detailLink: string;

  setName(name: string) {
    this.name = name;
  }
  setEngine(engine: string) {
    this.engine = engine;
  }
  setStatus(status: string) {
    this.status = status;
  }
  setColor(color: string) {
    this.color = color;
  }
  setDistance(distance: string) {
    this.distance = distance;
  }
  setPlace(place: string) {
    this.place = place;
  }
  setPrice(price: string) {
    this.price = price;
  }
  setImage(imgUrl: string) {
    this.imgUrl = imgUrl;
  }
  setLink(detailLink: string) {
    this.detailLink = detailLink;
  }

}

export const TABLE_COLUMNS = [
  '',
  '車種',
  '色',
  '走行距離',
  '排気量',
  '状態',
  '販売場所',
  '値段'
];
