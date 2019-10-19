import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url: "https://demostore.inofinitylabs.com",
      consumerKey: "ck_682364bde8cd0c3abc41c27e15f0336c9b508bb1",
      consumerSecret: "cs_e11a0bd2eb536d2a4f1e6bc863a062af12a85fe9",
      queryStringAuth: true,
      verifySsl: true,

    });

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then( (data: any) => {
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);
    }, (err: any) => {
      console.log(err)
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
