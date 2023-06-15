import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-multiplayer',
  templateUrl: './modal-multiplayer.component.html',
  styleUrls: ['./modal-multiplayer.component.scss']
})
export class ModalMultiplayerComponent implements OnInit {
  @Input() playerList!: any;
  @Output() restart = new EventEmitter<boolean>();
  execo!: boolean;
  textTitlteModal!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.playerList = this.playerList
      .slice()
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score);
    this.ontPremierExaequo();
  }

  ontPremierExaequo() {
    const sortedList = this.playerList
      .slice()
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score);
    let premierScore = sortedList[0].score;

    for (let i = 1; i < sortedList.length; i++) {
      if (sortedList[i].score === premierScore) {
        this.execo = true; // Deux joueurs sont premiers ex aequo
        this.textTitlteModal = 'It’s a tie!';
        return;
      }
    }

    this.execo = false; // Aucun joueur n'est premier ex aequo
    this.textTitlteModal = this.playerList[0].nom + ' Wins!';
  }

  handleGotoStart() {
    this.router.navigate(['start']);
  }

  handleRestart() {
    this.restart.emit(true);
  }
}
