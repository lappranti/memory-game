import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent {
  selectedTheme: string = 'numbers';
  selectedNumberOfPlayers: string = '1';
  selectedGridSize: string = '4*4';
  choicesList: any[] = [
    {
      id: 'theme',
      label: 'Select Theme',
      choices: ['numbers', 'icons']
    },
    {
      id: 'numbers',
      label: 'Numbers of Players',
      choices: [1, 2, 3, 4]
    },
    {
      id: 'grid',
      label: 'Grid Size',
      choices: ['4*4', '6*6']
    }
  ];

  constructor(private router: Router, private configService: ConfigService) {}

  selectChoice(choosed: HTMLElement) {
    const id = choosed.getAttribute('class')?.split(' ')[1];

    if (id == 'theme') {
      const currentActivedTheme = document.querySelector(`.` + id + '.actived');

      if (this.selectedTheme !== choosed?.textContent?.toLowerCase()) {
        this.selectedTheme = choosed.textContent?.toLocaleLowerCase() || '';
        currentActivedTheme?.classList.remove('actived');
        choosed.classList.add('actived');
      }
    } else if (id == 'numbers') {
      const currentActiveNombersOfPlayers = document.querySelector(
        '.' + id + '.actived'
      );

      if (
        this.selectedNumberOfPlayers !== choosed?.textContent?.toLowerCase()
      ) {
        this.selectedNumberOfPlayers =
          choosed.textContent?.toLocaleLowerCase() || '';
        currentActiveNombersOfPlayers?.classList.remove('actived');
        choosed.classList.add('actived');
      }
    } else {
      const currentActiveGrid = document.querySelector('.' + id + '.actived');

      if (choosed.textContent?.toLocaleLowerCase() != this.selectedGridSize) {
        this.selectedGridSize = choosed.textContent?.toLocaleLowerCase() || '';
        currentActiveGrid?.classList.remove('actived');
        choosed.classList.add('actived');
      }
    }
  }

  onSubmit() {
    const nbr = this.selectedGridSize == '4*4' ? 4 : 6;

    const config = {
      theme: this.selectedTheme,
      gridSize: nbr,
      numberOfPlayers: +this.selectedNumberOfPlayers
    };
    this.configService.setConfig(config).subscribe(() => {
      this.router.navigate(['game']);
    });
  }
}
