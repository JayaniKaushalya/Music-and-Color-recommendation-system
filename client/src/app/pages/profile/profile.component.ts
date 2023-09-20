import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
  });
  userID: string = '';
  errorText:string = "";
  firstName: string = '';
  lastName: string = '';
  role: string = '';
  contactNo: string = '';
  email: string = '';
  title = 'Edit';
  password = '';
  showPasswordFlag: boolean = false;
  viewAdmin = false;
  constructor(private profileService: ProfileService) { }
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
    this.contactNo = user.contact_no;
    this.email = user.email;
    this.password = user.password;
    this.profileForm.setValue({ firstName: this.firstName, lastName: this.lastName, email: this.email, contactNo: this.contactNo, password: this.password });
    this.disable();
  }
  disable(){
    if (this.title === 'Edit') {
      this.profileForm.controls['email'].disable();
      this.profileForm.controls['password'].disable();
      this.profileForm.controls['firstName'].disable();
      this.profileForm.controls['lastName'].disable();
      this.profileForm.controls['contactNo'].disable();
    }
  }

  backClicked() {
    window.history.back();
  }

  logOut(){
    sessionStorage.setItem('user', "");
    window.location.href = '/pages/auth';
  }

  onUpdate(){
    if (this.title === 'Edit') {
      this.title = 'Update';
      this.profileForm.controls['email'].enable();
      this.profileForm.controls['password'].enable();
      this.profileForm.controls['firstName'].enable();
      this.profileForm.controls['lastName'].enable();
      this.profileForm.controls['contactNo'].enable();
    } else {
    
        let email = this.profileForm.value.email;
        let password = this.profileForm.value.password;
        let firstName = this.profileForm.value.firstName;
        let lastName = this.profileForm.value.lastName;
        let contactNo = this.profileForm.value.contactNo;
        let data = {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          contact_no: contactNo
      }
      if (email === "" || password === "" || firstName === "" || lastName === "" || contactNo === "") {
        this.errorText = "Please fill all the fields";
      } else {
        this.profileService.updateProfile(this.userID,data).subscribe((res: any) => {
          if (res.status === 200) {
            this.errorText = "User profile updated successfully";
            this.title = 'Edit';
            this.disable();
          } else {
            this.errorText = "Something went wrong! Please try again later";
          }
        }, (err: any) => {
          this.errorText = "Something went wrong! Please try again later";
        });
      }
  }
  }

  showPassword() {
    this.showPasswordFlag = !this.showPasswordFlag;
  }

}
