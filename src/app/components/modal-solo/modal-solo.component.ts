import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-solo',
  templateUrl: './modal-solo.component.html',
  styleUrls: ['./modal-solo.component.scss']
})
export class ModalSoloComponent {
  @Output() restartGame = new EventEmitter<boolean>(false);
  @Input() time!: string;
  @Input() moves!: string;
  constructor(private router: Router) {}
  handleGotoStarter() {
    this.router.navigate(['start']);
  }

  handleRestartGame() {
    this.restartGame.emit(true);
  }
}
