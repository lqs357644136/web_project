import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

import { UserlistComponent } from './user/userlist/userlist.component';
import { VipComponent } from './user/vip/vip.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { EdituserComponent } from './user/edituser/edituser.component';

//双休数据绑定
import { FormsModule } from '@angular/forms';

//请求数据
import { HttpModule } from '@angular/http';

//富文本编辑器 
import { QuillModule } from 'ngx-quill'
//注意：在index.html引入css  <link href="https://cdn.quilljs.com/1.2.2/quill.snow.css" rel="stylesheet">

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductComponent,
    UserComponent,
    HomeComponent,
    UserlistComponent,
    VipComponent,
    AdduserComponent,
     EdituserComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,  
    HttpModule,
    QuillModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
