import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ProductDetailsPage } from '../product-details/product-details';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    
    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "https://demostore.inofinitylabs.com",
      consumerKey: "ck_682364bde8cd0c3abc41c27e15f0336c9b508bb1",
      consumerSecret: "cs_e11a0bd2eb536d2a4f1e6bc863a062af12a85fe9",
      queryStringAuth: true,
      verifySsl: true,

    });

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data: any) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err: any) => {
      console.log(err)
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event){
    this.page++;
    console.log("Getting Page " + this.page);
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then( (data) => {
      let temp = (JSON.parse(data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products);
      console.log(this.products);
      event.complete();

      if(temp.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "You have reached the end of products list !",
          duration: 3000
        }).present();

      }
    } ,(err: any) => {
      console.log(err)
    });
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product})
  }
}
