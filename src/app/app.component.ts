import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-contacts';
  private roles:string[];
  private authority: string;
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    if(this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAutorities();
    }
  }
}
