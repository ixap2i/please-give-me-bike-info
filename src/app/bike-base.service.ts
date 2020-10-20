import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BikeBaseService {
  name: string;
  model_number: string;
  status: string;
  color: string;
  distance: string;
  place: string;
  price: string;
  imgUrl: string;
  detailLink: string;

  setName(name: string) {
    this.name = name;
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
  '年式',
  '状態',
  '色',
  '走行距離',
  '販売場所',
  '値段'
];
