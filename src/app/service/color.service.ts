import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private http: HttpClient) {}

  generateColors(data: any): Observable<any> {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use cors-anywhere hosted version
    const apiUrl = 'http://colormind.io/api/';
    return this.http.post(proxyUrl + apiUrl, data);
  }
}
