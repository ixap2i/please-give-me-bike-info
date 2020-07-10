import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'top-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.pug',
  animations: [
    trigger('mouse-scroll', [
      state('scroll-up', style({
        opacity: 1,
        backgroundColor: '#000',
        color: '#fff'
      })),
      state('scroll-down', style({
        opacity: 1,
        backgroundColor: 'rgba(196, 196, 196, 0.28)'
      })),
      transition('scroll-up => scroll-down',[
        animate('1s')
      ]),
      transition('scroll-down => scroll-up',[
        animate('1s')
      ])
    ]),
    trigger('appear-top-icon',[
      state('appear-icon', style({
        opacity: 1
      })),
      state('disappear-icon', style({
        opacity: 0
      })),
      transition('appear-icon => disappear-icon', [
        animate('1s')
      ]),
      transition('disappear-icon => appear-icon', [
        animate('0.3s')
      ])
    ])
  ]
})
export class HeaderComponent {
  constructor() {}
  isStopped = false;

  @HostListener('window:scroll', ['$event'])
  scroll($event) {
    if ($event.currentTarget.window.pageYOffset > 230) {
      this.isStopped = false;
    } else {
      this.isStopped = true;
    }
  }
}
