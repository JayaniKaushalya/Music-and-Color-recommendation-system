import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { Environment } from 'src/environments/environments';
import { CaptureService } from './capture.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {
  @ViewChild('listContainer', { static: false }) listContainer!: ElementRef;
  firstName: string = '';
  lastName: string = '';
  userID: string = '';
  role: string = '';
  sysImage: any;
  openCamera: boolean = false;
  captureImage: boolean = false;
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  isProcessing: boolean = false;
  isDashboardView: boolean = false;
  moodExpression: string = 'Select Your Mood..';
  moodExpressionList: any = Environment.facialExpressions;
  openChatWindow: boolean = false;
  messageArray = [{
    user: '',
    message: '',
    time: '',
  }];
  messageDisabled: boolean = false;
  expressionMood: FormGroup = new FormGroup({ 
    mood: new FormControl('', Validators.required),
  });
  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
  });
  viewAdmin = false;
  constructor(private captureService: CaptureService,private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
   const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user._id === null || user._id === undefined) {
      window.location.href = '/pages/auth';
    }
    this.userID = user._id;
    this.role = user.role;
    if(user.role === 'Admin'){
      this.viewAdmin = true;
    }
    if(user.role === 'user'){   
      this.viewAdmin = false;
    }
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.expressionMood.setValue({mood: this.moodExpression});

  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public onStartToggle(){
    this.openCamera = !this.openCamera;
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
    this.captureImage = true;
  }

  getBack(){
    this.captureImage = false;
  }

  imageProcessing(){
    this.isProcessing = true;
    //this.expressionMood.setValue({mood: this.moodExpression});
    setTimeout(() => {
      this.isProcessing = false;
      this.isDashboardView = true;
      this.router.navigate( ['/pages/music'] ,{ queryParams: {expression: 'Happy'}});
    }, 3000);
  }

  onDashboard(){
    let mood = this.expressionMood.value.mood;
    const moodExpression = {
      user_id: this.userID,
      expression: mood,
      capture_url: this.sysImage,
      date: new Date(),
    }
    this.captureService.saveMoodExpression(moodExpression).subscribe((res: any) => {
      console.log(res);
      if(res.status === 200){
        this.router.navigate( ['/pages/music'] ,{ queryParams: {expression: mood}});
      } 
    }, (err: any) => { 
      this.toastr.error(err.error.message, 'Error');
    });
    
  }

  logOut(){
    sessionStorage.setItem('user', "");
    window.location.href = '/pages/auth';
  }

  openChat(){
    this.openChatWindow = !this.openChatWindow;
  }

  goBack(){
   window.location.href = '/pages/capture';
  }

  sendMessage() {
    let message = this.chatForm.value.message;
    if (message === '' || message === undefined || message === null) {
      return;
    }
    let time = new Date().toLocaleTimeString();
    this.messageArray.push({ user: 'you', message: message, time: time });
    this.chatForm.reset();
    this.messageDisabled = true;
    const data = {
      msg: message,
    }
    this.captureService.sendMessage(data).toPromise().then((res: any) => {
      console.log('res : ', res);
      time = new Date().toLocaleTimeString();
      this.messageDisabled = false;
      this.messageArray.push({ user: 'bot', message: res.msg, time: time });
      const listContainerElement = this.listContainer.nativeElement;
      listContainerElement.scrollTop = listContainerElement.scrollHeight;
    }, (err: any) => {
      console.log('err : ', err);
    });
  }

}
