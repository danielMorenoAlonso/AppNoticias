import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApinewsService {

  constructor(private http: HttpClient) { }

  // https://newsapi.org/v2/top-headlines?country=mx&apiKey=
  private url = "https://newsapi.org/v2/top-headlines?country=mx"
  private url2 = "https://newsapi.org/v2/top-headlines?";
  private apiKey = "152b379d0135450faae89d347268b248";

  topHeading(){
    return this.http.get(`${this.url}&apikey=${this.apiKey}`);
  }

  topHeadingFilter(code: string, cat: string){
    return this.http.get(`${this.url2}country=${code}&category=${cat}&apiKey=${this.apiKey}`)
  }
  topHeadingCountry(code:string){
    return this.http.get(`${this.url2}country=${code}&apiKey=${this.apiKey}`)
  }

}
