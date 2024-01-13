import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = "https://api.nasa.gov/planetary/apod?api_key=aSOQvAU3up46QHTURIWatQY17z43dblshhM0xkuP"
  constructor(private http:HttpClient) {

    
   }

   public getInfo(date:string){
      return this.http.get(this.url+"&start_date="+date,{responseType:"text"})
   }
}
