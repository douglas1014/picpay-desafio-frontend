import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('should create an instance', () => {
    expect(new LoginForm()).toBeTruthy();
  });

  it('should be valid if form value is valid', () => {
    let component = new LoginForm()
    component.setValue({
      "password": "Bobby",
      "email": "bobby@bobby.com",
    });

    expect(component.valid).toEqual(true);
  });
  it('should be get password', () => {
    let component = new LoginForm()
    component.setValue({
      "password": "Bobby",
      "email": "bobby@bobby.com",
    });
    expect(component.password).not.toBeNull();
  });

  it('should be get email', () => {
    let component = new LoginForm()
    component.setValue({
      "password": "Bobby",
      "email": "bobby@bobby.com",
    });

    expect(component.email).not.toBeNull();
  });

  it('should markAllAsTouched', () => {
    let component = new LoginForm()
    component.setValue({
      "password": "",
      "email": "bobby@bobby.com",
    });
    expect(component.markAllAsTouched()).not.toBeNull();
  });
  it('should getFirstErrorFrom', () => {
    let component = new LoginForm()
    component.setValue({
      "password": "",
      "email": "bobby@bobby.com",
    });
    expect(component.getFirstErrorFrom('password', 'password')).not.toBeNull();
  });

});