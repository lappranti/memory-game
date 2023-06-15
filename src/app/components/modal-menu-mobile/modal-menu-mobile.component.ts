import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-menu-mobile',
  templateUrl: './modal-menu-mobile.component.html',
  styleUrls: ['./modal-menu-mobile.component.scss']
})
export class ModalMenuMobileComponent {
  @Output() action = new EventEmitter<string>();

  constructor(private router: Router) {}

  handleGotoStart() {
    this.router.navigate(['start']);
  }

  handleActions(input: string) {
    this.action.emit(input);
  }
}
