import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from './client.guard';
import { AboutComponent } from './components/about/about.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleComponent } from './components/article/article.component';
import { ClientDashbordComponent } from './components/client-dashbord/client-dashbord.component';
import { ClientDetailesComponent } from './components/client-detailes/client-detailes.component';
import { DealComponent } from './components/deal/deal.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { InterestingArticlesComponent } from './components/interesting-articles/interesting-articles.component';
import { LoginComponent } from './components/login/login.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { MyDeadArticlesComponent } from './components/my-dead-articles/my-dead-articles.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SearchComponent } from './components/search/search.component';
import { SellerDetailsComponent } from './components/seller-details/seller-details.component';
import { SubmitRequestComponent } from './components/submit-request/submit-request.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { SuccesfulySubscribedComponent } from './components/succesfuly-subscribed/succesfuly-subscribed.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { ViewComponent } from './components/view/view.component';
import { NotClientGuard } from './not-client.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotClientGuard] },
  { path: 'subscribe', component: SubscribeComponent, canActivate: [NotClientGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'view', component: ViewComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent, canActivate: [NotClientGuard] },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'succ', component: SuccesfulySubscribedComponent },
  { path: 'seller/:id', component: SellerDetailsComponent , canActivate :[ClientGuard] },
  { path: 'client/:id', component: ClientDetailesComponent , canActivate :[ClientGuard] },
  { path: 'search/:text', component: SearchComponent },



  {
    path: 'dashboard', component: ClientDashbordComponent,
    children: [
      { path: 'add', component: AddArticleComponent },
      { path: 'submit-seller-request', component: SubmitRequestComponent },
      { path: 'my-articles', component: MyArticlesComponent },
      { path: 'interesting', component: InterestingArticlesComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'update/:id', component: UpdateArticleComponent },
      { path: 'deal/:id', component: DealComponent },
      { path: 'my-closed-articles', component: MyDeadArticlesComponent },
      { path: '', component: ProfilComponent }
    ],
    canActivate: [ClientGuard]
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
