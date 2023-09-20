import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MusicComponent } from './music/music.component';
import { CaptureComponent } from './capture/capture.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'music',
      component: MusicComponent,
    },
    {
      path: 'capture',
      component: CaptureComponent
    },
    {
      path: 'feedback',
      component: FeedbackComponent
    },
    {
      path: 'contact-us',
      component: ContactUsComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'feedbacks',
      component: FeedbackComponent,
    }
    
    // {
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
