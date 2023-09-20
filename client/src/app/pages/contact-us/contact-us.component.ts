import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  submitForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
  });
  userID: string = '';
  errorText:string = "";
  firstName: string = '';
  role: string = '';
  viewAdmin = false;
  constructor(private contactUsService: ContactUsService) { }
  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user._id === null || user._id === undefined) {
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
  }
  
  logOut(){
    sessionStorage.setItem('user', "");
    window.location.href = '/pages/auth';
  }

  onSubmit() {
    let email = this.submitForm.value.email;
    let message = this.submitForm.value.message;
    let firstName = this.submitForm.value.firstName;
    let lastName = this.submitForm.value.lastName;
    let contactNo = this.submitForm.value.contactNo;
    let data = {
      email: email,
      feedback: message,
      first_name: firstName,
      last_name: lastName,
      contact_no: contactNo,
      user_id: this.userID,
      date: new Date()
  }
  if (email === "" || message === "" || firstName === "" || lastName === "" || contactNo === "") {
    this.errorText = "Please fill all the fields";
  } else {
    this.contactUsService.submitContactUs(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.submitForm.reset();
        this.errorText = "Feedback submitted successfully";
      } else {
        this.errorText = "Something went wrong! Please try again later";
      }
    }, (err: any) => {
      this.errorText = "Something went wrong! Please try again later";
    });
  }
  }

  backClicked() {
    window.history.back();
  }

}
