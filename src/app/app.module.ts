import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerPanelComponent } from './components/manager-panel/manager-panel.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { ViewComponent } from './components/view/view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ClientDashbordComponent } from './components/client-dashbord/client-dashbord.component';
import { ClientHttpInterceptor } from './client-http-interceptor';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { SubmitRequestComponent } from './components/submit-request/submit-request.component';
import { ProfilComponent } from './components/profil/profil.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { InterestingArticlesComponent } from './components/interesting-articles/interesting-articles.component';
import { SuccesfulySubscribedComponent } from './components/succesfuly-subscribed/succesfuly-subscribed.component';
import { SellerDetailsComponent } from './components/seller-details/seller-details.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { DealComponent } from './components/deal/deal.component';
import { ClientDetailesComponent } from './components/client-detailes/client-detailes.component';
import { MyDeadArticlesComponent } from './components/my-dead-articles/my-dead-articles.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SubscribeComponent,
    ArticleComponent,
    ManagerPanelComponent,
    AboutComponent,
    HelpComponent,
    ViewComponent,
    ArticleCardComponent,
    ForgetPasswordComponent,
    ClientDashbordComponent,
    AddArticleComponent,
    SubmitRequestComponent,
    ProfilComponent,
    MyArticlesComponent,
    InterestingArticlesComponent,
    SuccesfulySubscribedComponent,
    SellerDetailsComponent,
    NotificationsComponent,
    UpdateArticleComponent,
    DealComponent,
    ClientDetailesComponent,
    MyDeadArticlesComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ClientHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
