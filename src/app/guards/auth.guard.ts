import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService) { }

  canActivate(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true;
    }
    return false;
  }

}
