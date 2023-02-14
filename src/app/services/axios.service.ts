import {Injectable} from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  url: string = "";
  header: object = {};
  body: object = {};

  constructor() {
  }

  post(url: string, body: object, header: object) {
    this.url = url;
    this.body = body;
    this.header = {headers: header};
    return axios.post(this.url, this.body, this.header);
  }
}
