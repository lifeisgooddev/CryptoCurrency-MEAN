import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {DataService} from "./data.service";
import {RouterModule} from "@angular/router";
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthenticationGuard} from "./authentication.guard";
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatPaginatorModule, MatSelectModule,
  MatTableModule, MatTabsModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatListModule, MatTooltipModule,
  MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatGridListModule,
  MatDialogModule, MatButtonToggleModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import {FooterComponent} from "./footer/footer.component";
import {UserService} from "./user.service";
import {CommonModule, registerLocaleData} from '@angular/common';
import localehr from '@angular/common/locales/hr';
import localeHrExtra from '@angular/common/locales/extra/hr';
import { ToNumberPipe } from './to-number.pipe';
import {PregledRacunaComponent} from './dashboard/pregled-racuna/pregled-racuna.component';
import { NovaTransakcijaComponent } from './dashboard/nova-transakcija/nova-transakcija.component';
import { PregledTransakcijaComponent } from './dashboard/pregled-transakcija/pregled-transakcija.component';
import {addAccount, PostavkeComponent, removeAccount} from './dashboard/postavke/postavke.component';
import {TRDialog} from "./dashboard/pregled-racuna/pregled-racuna.component";
import { DijagramValutaComponent } from './dashboard/dijagram-valuta/dijagram-valuta.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { Tab1Component } from './dashboard/dijagram-valuta/tab1/tab1.component';
import { Tab2Component } from './dashboard/dijagram-valuta/tab2/tab2.component';
import { Tab3Component } from './dashboard/dijagram-valuta/tab3/tab3.component';
registerLocaleData(localehr, 'hr-HR', localeHrExtra);
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ToNumberPipe,
    PregledRacunaComponent,
    NovaTransakcijaComponent,
    PregledTransakcijaComponent,
    PostavkeComponent,
    TRDialog,
    addAccount,
    removeAccount,
    DijagramValutaComponent,
    Tab1Component,
    Tab2Component,
    Tab3Component
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatTooltipModule,
    HttpClientModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    NgxChartsModule,
    MatButtonToggleModule,
    RouterModule.forRoot(
      [
        {
          path:'',
          component: WelcomeComponent
        },
        {
          path:'api',
          component: WelcomeComponent
        },
        {
          path:'register',
          component: RegisterComponent
        },
        {
          path:'dashboard',
          component: DashboardComponent,
          //canActivate: [AuthenticationGuard]
        },
      ]
    )
  ],
  providers: [DataService, UserService, AuthenticationGuard,[{ provide: LOCALE_ID, useValue: "hr-HR" }]],
  bootstrap: [AppComponent],
  entryComponents: [TRDialog,addAccount, removeAccount]
})
export class AppModule { }
