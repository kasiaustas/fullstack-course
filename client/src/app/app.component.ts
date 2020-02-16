import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>'

})

//берет токен из localstorage в браузере
export class AppComponent implements OnInit{
   constructor(private auth: AuthService){

   }

   ngOnInit(){
     const potentialToken = localStorage.getItem('auth-token')
     if(potentialToken !== null){
        this.auth.setToken(potentialToken)
     }
   }
}
