import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular5-toaster';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private toaster: ToasterService
  )
                { }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    username: this.username,
    password: this.password,
  });

  loginUser(formdata: any): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.toaster.pop({
              type: 'error',
              title: "Error!",
              body: data.json().message,
              timeout: 3000
            });
          } else {
            window.location.replace("/");
          }
          this.loginForm.reset();
        });
    }
  }

  ngOnInit() {
  }

}
