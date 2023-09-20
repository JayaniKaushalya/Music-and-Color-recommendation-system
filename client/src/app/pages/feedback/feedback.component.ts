import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{
  userID: string = '';
  errorText:string = "";
  firstName: string = '';
  role: string = '';
  viewAdmin = false;
  reviewSource!: CustomStore;
  constructor(private feedbackService: FeedbackService ) { }
  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if ((user._id === null || user._id === undefined) && user.role == 'admin') {
      window.location.href = '/pages/auth';  
    }
    this.userID = user._id;
    this.firstName = user.first_name;
    this.role = user.role;
    if(user.role === 'Admin'){
      this.viewAdmin = true;
    }
    if(user.role === 'user'){
      this.viewAdmin = false;
    }
    this.loadReview();
  }

  logOut(){
    sessionStorage.setItem('user', "");
    window.location.href = '/pages/auth';
  }

  back(){
    window.history.back();
  }

  loadReview(){
    this.reviewSource = new CustomStore({
      load: () => this.feedbackService.getReview().toPromise().then((res: any) => {
        console.log('review res : ', res);
        if(res.status == 200){
          return res.data;
        }
      }, (err: any) => {
        console.log('review err : ', err);
      }),
      remove: (key: any) => 
      this.feedbackService.deleteReview(key._id).toPromise().then((res: any) => {
        if(res.status == 200){
          return res.data;
        }
      }, (err: any) => {
        console.log('review err : ', err);
      }),
  });

  }

}
