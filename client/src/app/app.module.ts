import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordItemComponent } from './record-item/record-item.component';
import { DiscoverRecordComponent } from './discover-record/discover-record.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatGridListModule, MatFormField, MatFormFieldModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModalComponent } from './components/modal/ng-modal.component';
import { AuthGuard } from './_guards/auth.gaurd';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";


import { RecordService } from './services/record.service';
import { SigninComponent } from './signin/signin.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("311624336135692")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("194602267409-3vee0att2hh3dov7ie0t88u2iqdbjg53")
      },
    ]);
  return config;
}

// google client secret
// oDJjiUq9vROhhyW6G3bxxmCs

const appRoutes: Routes = [
  { path: '', component: PageWrapperComponent,
    children: [
      { path: 'login', component: SigninComponent},
      { path:'discover', component: DiscoverRecordComponent, canActivate: [AuthGuard] },
      { path: 'record/:id', component: RecordItemComponent, canActivate: [AuthGuard] },
      { path: 'mycollection', component: CatalogComponent, canActivate: [AuthGuard]},
      // otherwise redirect to home
      { path: '**', redirectTo: '', canActivate: [AuthGuard]} 
    ]}
  ]



@NgModule({
  declarations: [
    AppComponent,
    RecordListComponent,
    RecordItemComponent,
    DiscoverRecordComponent,
    NgModalComponent,
    SigninComponent,
    CatalogComponent,
    PageWrapperComponent,
    NavBarComponent 
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    NgbModule,
    SocialLoginModule
  ],
  providers: [
    RecordService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
