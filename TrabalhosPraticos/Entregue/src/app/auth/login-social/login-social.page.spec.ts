import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSocialPage } from './login-social.page';

describe('LoginSocialPage', () => {
  let component: LoginSocialPage;
  let fixture: ComponentFixture<LoginSocialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
