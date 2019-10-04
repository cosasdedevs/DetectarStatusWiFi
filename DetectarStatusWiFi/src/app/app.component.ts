import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// Importamos nuestro network service
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform      : Platform,
    private splashScreen  : SplashScreen,
    private statusBar     : StatusBar,
    private networkService: NetworkService // Lo agregamos en nuestro constructor
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      /* init network service */
      this.networkService.initConnection();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
