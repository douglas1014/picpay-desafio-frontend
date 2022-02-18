import { ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks'
import { AuthService } from 'src/app/core/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    return MockBuilder(LoginComponent).mock([Router, AuthService]);
  });

  it('should create', () => {
    const fixture = MockRender(LoginComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});