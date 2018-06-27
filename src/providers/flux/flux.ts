import { Flux } from './../../models/Flux/flux';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FluxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FluxProvider {

  public listFlux = Array<Flux>(0);

  /**
   *Creates an instance of FluxProvider.
  * @param {HttpClient} http
  * @param {Storage} storage
  * @memberof FluxProvider
  */
  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello FluxProvider Provider');
    this.storage.get('Flux').then(
      data => {
        console.log(data);
        this.listFlux = JSON.parse(data) || Array<Flux>(0);
      },
      error => {
        console.log('Erreur Flux Constructor');
      }
    );
  }

  /**
   * Fonction qui sert a ajouter un flux a l'environnement
   *
   * @param {Flux} f
   * @returns boolean : indique son succes
   * @memberof FluxProvider
   */
  add(f: Flux){
    let res: boolean = false;
    if(!this.alreadyExist(f)){
      this.listFlux.push(f);
      this.save();
      res = true;
    }
    return res;
  }


  /**
   * Fonction qui sert a supprimer un flux de l'environnement
   *
   * @param {number} id
   * @memberof FluxProvider
   */
  remove(id: number){
    for(let i = 0; i < this.listFlux.length; i++){
      if(this.listFlux[i].id === id){
        this.listFlux.splice(i,1);
        this.save();
        break;
      }
    }
  }

  /**
   *  Fonction qui sauvegarde la liste des flux dans la base du smartphone
   *
   * @memberof FluxProvider
   */
  save(){
    this.storage.set('Flux', JSON.stringify(this.listFlux));
  }


  /**
   *  Fonction qui supprime tous les elements de la base
   *
   * @memberof FluxProvider
   */
  clean(){
    this.storage.clear();
  }

  /**
   *Fonction retournant la liste des flux enregistrés
   *
   * @returns Promise<Array<Flux>>
   * @memberof FluxProvider
   */
  getAll(){
    console.log('ici');
    return new Promise<Array<Flux>>((resolve, reject) => {
      this.storage.get('Flux').then(
        data => {
          console.log(data);
          resolve(JSON.parse(data));
        },
        error => {
          reject(error);
        }
      )
    });
  }

  /**
   *  Fonction qui verifie si un flux existe deja ou non
   *
   * @param {Flux} f
   * @returns boolean
   * @memberof FluxProvider
   */
  alreadyExist(f: Flux){
    let res: boolean = false;

    for(let i = 0; i < this.listFlux.length; i++){
      if(this.listFlux[i].title === f.title || this.listFlux[i].link === f.link){
        res = true;
        break;
      }
    }

    return res;
  }

  /**
   *  Fonction qui retourne a Flux a l'aide de son id
   *
   * @param {number} id
   * @returns Flux
   * @memberof FluxProvider
   */
  getById(id: number){
    let res: Flux = null;

    for(let i = 0; i < this.listFlux.length; i++){
      if(this.listFlux[i].id === id){
        res = this.listFlux[i];
        break;
      }
    }

    return res;
  }

}
