import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatIconRegistry } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AvatarContainerComponent } from './components/avatar-container/avatar-container.component';
import { TitleContainerComponent } from './components/title-container/title-container.component';
import { LogoItemComponent } from './components/logo-item/logo-item.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';

const AuthenticationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    PageWrapperComponent,
    AvatarContainerComponent,
    TitleContainerComponent,
    LogoItemComponent,
    MenuItemComponent,
    StatsCardComponent,
    DoughnutChartComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  providers: [MatIconRegistry, AuthenticationInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
