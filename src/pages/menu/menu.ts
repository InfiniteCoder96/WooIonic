import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../home/home';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

    this.WooCommerce = WC({
      url: "https://demostore.inofinitylabs.com",
      consumerKey: "ck_682364bde8cd0c3abc41c27e15f0336c9b508bb1",
      consumerSecret: "cs_e11a0bd2eb536d2a4f1e6bc863a062af12a85fe9",
      queryStringAuth: true,
    });

    this.WooCommerce.getAsync("products/categories").then( (data: any) => {
      console.log(JSON.parse(data.body).product_categories);
      let temp:any[] = JSON.parse(data.body).product_categories;
      for( let i = 0; i < temp.length; i++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "clothing"){
            temp[i].icon = "shirt";
          }

          if(temp[i].slug == "decor"){
            temp[i].icon = "bulb";
          }

          if(temp[i].slug == "music"){
            temp[i].icon = "musical-notes";
          }

          if(temp[i].slug == "posters"){
            temp[i].icon = "images";
          }

          if(temp[i].slug != "uncategorized"){
            this.categories.push(temp[i]);
          }
        }
      }
    }, (err: any) => {
      console.log(err)
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category});
  }
}
