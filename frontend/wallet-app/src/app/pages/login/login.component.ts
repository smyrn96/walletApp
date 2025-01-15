import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: Router
  ) {}

  onSubmit(): void {
    console.log(this.loginForm.value);

    this.accountService.onLogin(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.route.navigateByUrl('/dashboard');
    });

    this.loginForm.reset();
  }
}
