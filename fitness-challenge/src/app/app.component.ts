import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fitness-challenge';

constructor(private readonly route: ActivatedRoute,
            private authService: AuthService){
  route.queryParams.subscribe( (params) => {
    console.log('params: ', params);
    if(params.code)
    this.login(params.code)
  });
}

login(code:string){
  this.authService.login(code).subscribe(
    res => console.log('res', res)
  )
}

}
