import { TestBed } from '@angular/core/testing';

import { JwtAuthorizationGuardGuard } from './jwt-authorization-guard.guard';

describe('JwtAuthorizationGuardGuard', () => {
    let guard: JwtAuthorizationGuardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(JwtAuthorizationGuardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
