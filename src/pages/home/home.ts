import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "https://demostore.inofinitylabs.com",
      consumerKey: "ck_682364bde8cd0c3abc41c27e15f0336c9b508bb1",
      consumerSecret: "cs_e11a0bd2eb536d2a4f1e6bc863a062af12a85fe9",
      queryStringAuth: true,
      verifySsl: true,

    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data: any) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err: any) => {
      console.log(err)
    })
  }

  ionViewDidLoad(){
    setInterval(() => {
      if(this.productSlides.getActiveIndex() == this.productSlides.length() - 1){
        this.productSlides.slideTo(0);
      }
      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts(event){

    if(event == null){
      this.page = 2;
      this.moreProducts = [];
    }
    else{
      this.page++;
    }

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data: any) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null){
        event.complete();
      }
    
      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "You have reached the end of products list !",
          duration: 3000
        }).present();
      }

    }, (err: any) => {
      console.log(err)
    })

  }

}
