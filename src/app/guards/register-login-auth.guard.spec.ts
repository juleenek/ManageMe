import { TestBed } from '@angular/core/testing';

import { RegisterLoginAuthGuard } from './register-login-auth.guard';

describe('RegisterLoginAuthGuard', () => {
  let guard: RegisterLoginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisterLoginAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
