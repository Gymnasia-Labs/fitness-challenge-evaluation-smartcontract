import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Concept2Service } from '../services/concept2.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getLoginURL(brand:string){
    return this.authService.getLoginLink(brand);
  }

}
