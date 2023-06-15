import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarterComponent } from './pages/starter/starter.component';
import { GamingComponent } from './pages/gaming/gaming.component';
import { ModalSoloComponent } from './components/modal-solo/modal-solo.component';
import { ModalMenuMobileComponent } from './components/modal-menu-mobile/modal-menu-mobile.component';
import { ModalMultiplayerComponent } from './components/modal-multiplayer/modal-multiplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    GamingComponent,
    ModalSoloComponent,
    ModalMenuMobileComponent,
    ModalMultiplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
