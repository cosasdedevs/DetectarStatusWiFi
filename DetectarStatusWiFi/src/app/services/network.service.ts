import { Injectable } from '@angular/core';
// Importamos el plugin Network
import { Network } from '@ionic-native/network/ngx';
// Importamos ToastController para mostrar mensajes
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public disconnectSubscription: any;
  public connectSubscription   : any;
  public isAvailable           : boolean = false;

  constructor(
    private network  : Network,
    private toastCtrl: ToastController) {
      this.initConnection();
    }

  /* init connection */
  initConnection() {
    this.isAvailable = true;
    this.setNetwork();
    this.onlineConnection();
  }

  /* set network */
  setNetwork() {
    if(['wifi', '2g', '3g', '4g', 'cellular'].indexOf(this.network.type)){
      this.isAvailable = true;
      this.onlineConnection();
    } else {
      this.isAvailable = false;
      this.offlineConnection();
    }
  }

  /* check connection */
  onlineConnection() {
    /* verifica que estes conectado a una red */
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if(this.network.type == "wifi" || this.network.type == "2g" || this.network.type == "3g"){
          this.isAvailable = true;
          this.presentToast("Estás conectado a internet :)");
        }
      }, 1000);
    },(err) => {
      console.log("Error is: ", err);
    });
  }
  
  /* offline connection */
  offlineConnection() {
    this.isAvailable = false;
    /* verifica cuando ya no te encuentas conectado a una red */
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      setTimeout(() => {
        this.isAvailable = false;
        this.presentToast("No estás conectado a ninguna red :(");
      }, 1000);
    });
  }

  /* show message */
  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message : message,
      duration: 3000,
      position: "top",
      color   : "dark"
    });
    toast.present();
  }
}
