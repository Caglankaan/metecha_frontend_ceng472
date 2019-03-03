import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    userType;
    userId:string;
    usersname:string;
    userssurname:string;
    isLogin:boolean;
    username:string;
    getUrl(path){
        return "https://metecha.tk"+path;
    }

    getInfo = this.getType().subscribe(res => {

            if (res['status'] == 200) {
                this.isLogin = true;
                this.userType = res['body']['userType'];
                this.userId = res['body']['_id'];
                this.usersname = res['body']['name'];
                this.username = res['body']['username'];
                this.userssurname = res['body']['surname'];
            }
            else if (res['status'] == 204 || res['status'] == undefined) {

            }
            else {
                this.isLogin = false;
            }
        });




    form = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });





    initializeFormGroup() {
        this.form.setValue({
            username: '',
            password: '',
        });
    }
  login(user) {
      const body = {
          username: user.username,
          password: user.password
      };

      this.username = user.username;
      const req = new HttpRequest("POST", this.getUrl('/authenticate/'), body, { withCredentials: true});
      return this.http.request(req);

    }

    getType(){
        const req = new HttpRequest("GET", this.getUrl("/api/check_session/"), { withCredentials: true});
        return this.http.request(req);
    }



  logOut() {
      const req = new HttpRequest("GET", this.getUrl("/api/logout/"), {withCredentials: true, responseType: 'json'});
      return this.http.request(req);
  }
}
