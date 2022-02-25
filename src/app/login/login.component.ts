import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(public router: Router, private service: ApiService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/main/dashboard']);
    }
    this.loginForm = new FormGroup({
      'username': new FormControl("", [Validators.required]),
      'password': new FormControl("", [Validators.required, Validators.minLength(2),]),
    });
  }

  login() {
    const change = this.loginForm.value.username.replace('@', '%40')
    let king = `username=${change}&password=${this.loginForm.value.password}`

    if (this.loginForm.valid) {
      this.service.login(king).subscribe({
        next: (res) => {
          localStorage.setItem('customer_code', res.customer_code);
          localStorage.setItem("token", res.access_token);
          console.log(res, '영승')
          this.loginForm.reset();
          this.router.navigate(['/main/dashboard']);
        },
        error: (err) => {
          alert('존재하지 않는 아이디이거나 패스워드가 다릅니다')
        },
        complete: () => {
        }
      });
    } else {
      alert('아이디와 패스워드를 확인해주세요')
    }
  }

  goregister() {
    this.router.navigate(['/register']);
  }

  godashboard() {
    this.router.navigate(['/main/dashboard']);

  }

}
