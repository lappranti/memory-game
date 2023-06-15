import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.scss']
})
export class GamingComponent implements OnInit, AfterViewInit {
  configuration!: {
    theme: string;
    gridSize: number;
    numberOfPlayers: number;
  };
  tokens: any[] = [];
  height!: string;

  firstClickedToken: any = null;
  isTimerRunning: boolean = false;

  playersList: any[] = [];

  timerSecond: string = '00';
  timerMunite: string = '0';

  isFirstMove: boolean = true;
  isLastMove: boolean = false;
  numberOfMatches: number = 0;

  idTimer: any = 0;
  i: number = 0;
  j: number = 0;
  showModalSolo: boolean = false;
  currentPartiTime!: string;
  currentMoves!: string;

  showModalMenuMobile: boolean = false;
  actionFromMenuMobile!: string;
  indexPlayer!: number;
  compteurPlay: number = 0;

  showModalMultiplayer: boolean = false;
  //playerListScore: any[] = [];

  constructor(
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initilisationGame();
  }

  initilisationGame() {
    this.indexPlayer = 0;
    this.compteurPlay = 0;
    this.i = 0;
    this.j = 0;
    this.tokens = [];
    this.showModalSolo = false;
    this.showModalMultiplayer = false;
    this.configService.getConfig().subscribe(res => {
      this.configuration = res.config;
      this.tokens = res.tokens;
      this.numberOfMatches =
        (this.configuration.gridSize * this.configuration.gridSize) / 2;
      // console.log(this.configuration.numberOfPlayers);
      for (let i = 0; i < this.configuration.numberOfPlayers; i++) {
        this.playersList[i] = {
          id: i,
          nom: 'player ' + (i + 1),
          score: 0
        };
      }

      clearInterval(this.idTimer);
      this.isFirstMove = true;
      this.isLastMove = false;
      this.numberOfMatches =
        (this.configuration.gridSize * this.configuration.gridSize) / 2;

      this.timerMunite = '0';
      this.timerSecond = '00';

      const matchedList = document.querySelectorAll('.show-token');
      if (matchedList) {
        matchedList.forEach(el => {
          el.classList.remove('matched');
          el.classList.remove('show-token');
        });
      }
    });
  }

  ngAfterViewInit(): void {
    const jetonContainer = document.querySelector('.jetons');
    if (jetonContainer) {
      const elementWidth = jetonContainer.clientWidth;
      setTimeout(() => {
        this.height = elementWidth + 'px';
        this.cdr.detectChanges(); // Forcer la détection des modifications
      });
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    const jetonContainer = document.querySelector('.jetons');
    if (jetonContainer) {
      const elementWidth = jetonContainer.clientWidth;
      this.height = elementWidth + 'px';
    }
  }

  onTokenClick(token: any) {
    if (this.isFirstMove) {
      this.setTimer();
    }
    this.isFirstMove = false;
    if (this.firstClickedToken) {
      token.target.classList.add('show-token');
      const conditionalMatch: boolean = this.configuration.theme.includes(
        'icons'
      )
        ? token.target.querySelector('i').classList[1] ==
          this.firstClickedToken.target.querySelector('i').classList[1]
        : token.target.textContent ===
          this.firstClickedToken.target.textContent;
      if (conditionalMatch) {
        this.handleMatchingTokens(token);
      } else {
        this.handleMismatchedTokens(token);
      }
    } else {
      this.firstClickedToken = token;
      this.firstClickedToken.target.classList.add('show-token');
    }
    this.calculateMoves();
  }

  handleMatchingTokens(token: any) {
    this.numberOfMatches--;
    this.isLastMove = this.numberOfMatches === 0 ? true : false;

    const matchedList = document.querySelectorAll('.matched');
    if (matchedList) {
      matchedList.forEach(el => {
        el.classList.remove('matched');
      });
    }
    this.firstClickedToken.target.classList.add('matched');
    token.target.classList.add('matched');
    this.firstClickedToken = null;
    this.playersList[this.indexPlayer].score++;
  }

  handleMismatchedTokens(token: any) {
    // console.log('Mismatched token !');

    this.isTimerRunning = true;
    setTimeout(() => {
      this.firstClickedToken.target.classList.remove('show-token');
      token.target.classList.remove('show-token');
      this.firstClickedToken = null;

      this.isTimerRunning = false;
    }, 1500);
  }

  extractPlayerInfo(player: string) {
    const info = player.slice(0, 1) + ' ' + player.slice(7);
    return info;
  }

  setTimer() {
    if (this.playersList.length == 1) {
      this.idTimer = setInterval(() => {
        if (this.i >= 59) {
          this.i = 0;
          this.j++;
          this.timerMunite = this.j + '';
          this.timerSecond = '0' + this.i;
        } else {
          this.i++;
          this.timerSecond = this.i < 10 ? '0' + this.i : this.i + '';
        }
      }, 1000);
    }
  }

  calculateMoves() {
    if (this.playersList.length <= 1) {
      this.playersList[0].score++;
      if (this.isLastMove) {
        //Stop timer
        clearInterval(this.idTimer);
        this.showModalSolo = true;
        this.currentPartiTime = this.timerMunite + ':' + this.timerSecond;
        this.currentMoves = this.playersList[0].score + ' Moves';
      }
    } else {
      this.compteurPlay++;
      const plyarsElementList = document.querySelectorAll('.joueur.players');
      plyarsElementList.forEach(el => {
        el.classList.remove('currentPlayer');
      });
      plyarsElementList[this.indexPlayer].classList.add('currentPlayer');
      if (this.compteurPlay == 2) {
        this.indexPlayer++;
        if (this.indexPlayer >= this.playersList.length) this.indexPlayer = 0;
        this.compteurPlay = 0;
      }
      if (this.isLastMove) {
        this.showModalMultiplayer = true;
      }
    }
  }

  handleGotoStarter() {
    this.router.navigate(['start']);
  }

  handleShowMenuMobile() {
    this.showModalMenuMobile = true;
    clearInterval(this.idTimer);
  }

  handleDoMenuMobile(action: string) {
    this.showModalMenuMobile = false;
    if (action == 'restart') {
      this.initilisationGame();
    } else if (action == 'resume') {
      this.setTimer();
    }
  }
}
