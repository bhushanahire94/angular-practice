import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ConstantServiceService } from 'src/app/shared/services/constant-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg: any;
  user: any;
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private auth: AuthService, private router: Router,private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
   
  }


  onSubmit() {
    this.errorMsg = ''
    this.loading = true;
  
    if (this.loginForm.value.email == "" || this.loginForm.value.password == "") {
      this.errorMsg = 'Username and Password fields cannot be blank';
      this.loading = false;
    }
    else
    {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
        this.user = result;
          this.auth.setToken('abcdefghijklmnopqrstuvwxyz');
          localStorage.setItem('role', this.user.user.roleName);
          if (this.auth.isLoggedIn()) {
            if (this.user.user.roleName == "admin") {
              this.router.navigate(['/admin']);
            }
            if (this.user.user.roleName == "user") {
              this.router.navigate(['/user']);
            }
          }
        },
        (err: Error) => {
          this.errorMsg = err.message;
        }
      );
    }
  }

//Commeted code fpr refrence
  // onSubmit() {
  //   if (this.loginForm.valid) {
  //    this.auth.login(this.loginForm.value).subscribe(
  //      (result) => {
  //       this.user = result;
  //       //  this.auth.setToken('abcdefghijklmnopqrstuvwxyz');
  //       //  localStorage.setItem('role', this.user.user.roleName);
  //        if (this.auth.isLoggedIn()) {
  //          console.log(result)
  //          if (result.role == "admin") {
  //            this.router.navigate(['/admin']);
  //          }
  //          if (result.role == "user") {
  //            this.router.navigate(['/user']);
  //          }
  //        }
  //      },
  //      (err: Error) => {
  //        this.errorMsg = err.message;
  //      }
  //    );
  //    }
  //  }

 
}
