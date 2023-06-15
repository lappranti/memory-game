import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private theme: string = '';
  private gridSize: number = 0;
  private numberOfPlayers: number = 0;
  private configStoradge = JSON.parse(
    localStorage.getItem('memorStoradge') || '{}'
  );

  private tokens: any[] = [];
  private icons: string[] = [
    'bi bi-airplane',
    'bi bi-alarm',
    'bi bi-arrow-through-heart',
    'bi bi-arrows-fullscreen',
    'bi bi-arrows-move',
    'bi bi-bag',
    'bi bi-bag-dash',
    'bi bi-balloon',
    'bi bi-balloon-heart',
    'bi bi-bank',
    'bi bi-bank2',
    'bi bi-basket',
    'bi bi-basket2',
    'bi bi-battery-full',
    'bi bi-battery-half',
    'bi bi-bell-slash',
    'bi bi-bell-slash-fill',
    'bi bi-bicycle',
    'bi bi-blockquote-left',
    'bi bi-blockquote-right',
    'bi bi-bluetooth',
    'bi bi-boombox',
    'bi bi-boombox-fill',
    'bi bi-box',
    'bi bi-boxes',
    'bi bi-bricks',
    'bi bi-broadcast-pin',
    'bi bi-buildings',
    'bi bi-bullseye',
    'bi bi-calendar-day',
    'bi bi-calendar-month',
    'bi bi-calendar2-date',
    'bi bi-camera',
    'bi bi-camera-reels',
    'bi bi-camera-video',
    'bi bi-camera-video-off',
    'bi bi-car-front',
    'bi bi-car-front-fill',
    'bi bi-cash-coin',
    'bi bi-cash',
    'bi bi-cc-circle',
    'bi bi-cc-square',
    'bi bi-chat-square-text',
    'bi bi-chat-text',
    'bi bi-clock',
    'bi bi-cloud-drizzle',
    'bi bi-coin',
    'bi bi-controller',
    'bi bi-currency-dollar',
    'bi bi-currency-euro',
    'bi bi-diagram-2',
    'bi bi-diagram-3-fill',
    'bi bi-dribbble',
    'bi bi-easel',
    'bi bi-emoji-frown',
    'bi bi-emoji-heart-eyes',
    'bi bi-fuel-pump',
    'bi bi-fire',
    'bi bi-globe-americas',
    'bi bi-globe-asia-australia',
    'bi bi-hand-index',
    'bi bi-hand-thumbs-up',
    'bi bi-heart-pulse',
    'bi bi-house-door',
    'bi bi-lightbulb-off',
    'bi bi-lungs',
    'bi bi-magnet',
    'bi bi-mic',
    'bi bi-mortarboard',
    'bi bi-music-player'
  ];
  constructor() {}

  getConfig() {
    this.tokens = [];

    if (
      this.theme === '' &&
      this.gridSize === 0 &&
      this.numberOfPlayers === 0
    ) {
      this.theme = this.configStoradge.theme;
      this.gridSize = this.configStoradge.gridSize;
      this.numberOfPlayers = this.configStoradge.numberOfPlayers;
    }

    const config = {
      theme: this.theme,
      gridSize: this.gridSize,
      numberOfPlayers: this.numberOfPlayers
    };

    for (let i = 1; i <= (this.gridSize * this.gridSize) / 2; i++) {
      this.tokens.push(i);
      this.tokens.push(i);
    }
    this.tokens = this.shuffleTokens(this.tokens);

    if (this.theme.includes('icons')) {
      this.icons = this.shuffleTokens(this.icons);
      for (let i = 0; i < this.tokens.length; i++) {
        this.tokens[i] = this.icons[this.tokens[i]];
      }
    }

    return of({ config: config, tokens: this.tokens });
  }

  setConfig(config: {
    theme: string;
    gridSize: number;
    numberOfPlayers: number;
  }) {
    this.theme = config.theme;
    this.gridSize = config.gridSize;
    this.numberOfPlayers = config.numberOfPlayers;

    localStorage.setItem(
      'memorStoradge',
      JSON.stringify({
        theme: this.theme,
        gridSize: this.gridSize,
        numberOfPlayers: this.numberOfPlayers
      })
    );
    return of([]);
  }

  shuffleTokens(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
