import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CaptureComponent } from './capture/capture.component';
import { WebcamModule } from 'ngx-webcam';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MusicComponent } from './music/music.component';
import { DxDataGridModule } from 'devextreme-angular';
// import {MatIconModule} from '@angular/material/icon'

@NgModule({
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    CommonModule,
    DxDataGridModule,
    // MatIconModule
  ],
  declarations: [
    PagesComponent,
    FeedbackComponent,
    ContactUsComponent,
    CaptureComponent,
    ProfileComponent,
    MusicComponent
  ],
})
export class PagesModule {
}
