import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('5000ms')])
    ])
  ]
})
export class AuthComponent implements OnInit {
  greeting: string;
  errorText?: string;
  viewLogin: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  submitForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private toastr: ToastrService) {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 18) {  
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
   }
  ngOnInit(): void {
  }

  onToggle(){
    this.viewLogin = !this.viewLogin;
    this.errorText = "";
  }

  onSubmit(){
    let log_email = this.loginForm.value.email;
    let log_password = this.loginForm.value.password;
    if(log_email == "" || log_password == ""){ 
      this.errorText = "Please enter email and password";
    } else {
      let loginDetails = {
        email: log_email,
        password: log_password
      }
      sessionStorage.setItem('user', "");
      this.authService.login(loginDetails).subscribe((res: any) => {
        if(res.status == 200){ 
          this.errorText = "";
          sessionStorage.setItem('user', JSON.stringify(res.data));
          window.location.href = "/pages/capture";
        };
        if(res.status == 401){ this.errorText = "Invalid email or password"; };
      }), () => {
        this.errorText = "Something went wrong";
      };

    }
  }

  onCreate() {
    this.toastr.success(`Sucessfuly Updated the item`,`Success`);
    let email = this.submitForm.value.email;
    let password = this.submitForm.value.password;
    let firstName = this.submitForm.value.firstName;
    let lastName = this.submitForm.value.lastName;
    let contactNo = this.submitForm.value.contactNo;
    if(email == "" || password == "" || firstName == "" || lastName == "" || contactNo == ""){
      this.errorText = "Please fill all the fields";
    }
    else {
      let submitDetails = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        contact_no: contactNo,
        role: "user",
      }
      this.authService.createUser(submitDetails).subscribe((res: any) => {
        console.log(res);
        if(res.status == 200){
          this.toastr.success(`Sucessfuly Updated the item`,`Success`);
          this.errorText = "User Created Successfully";
          this.submitForm.reset();
          setTimeout(() => {
            this.viewLogin = true;
            this.errorText = "";
          }, 1500);
        };
        if(res.status == 409){ this.errorText = "User already exists"; };
      }), () => {
        this.errorText = "Something went wrong";
      };
    }
    
  }

  onInputChange(){
    this.errorText = "";
  }

}
