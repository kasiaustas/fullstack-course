import {Injectable} from "@angular/core";
import {User} from '../interfaces'
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";



@Injectable({ //декоратор
  providedIn: 'root' //автоматически зарегит данный сервис в корневом модуле, чтобы не добавлять
  //в массив providers в app.module.ts
})
export class AuthService {

  private token = null;

  constructor(private http: HttpClient){

  }

  register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string}>{
     return this.http.post<{token: string}>('/api/auth/login', user)
       .pipe(
         tap( //позволяет выцепить что-то из стрима
           ({token})=>{
             localStorage.setItem('auth-token', token)
             this.setToken(token)
           }
         )
       )
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(): string{
    return this.token;
  }

  isAuthenticated(): boolean{ //зарегистрирован пользователь сейчас в системе или нет
      return !!this.token;//приводим к булевому значению
  }

  logout(){
    this.setToken(null);
    localStorage.clear();
  }
}
