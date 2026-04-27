import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://127.0.0.1:8000/api/services';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const data = response.data;

        return {
          open: data.filter((s: any) => s.status === 'open').length,
          in_progress: data.filter((s: any) => s.status === 'in_progress').length,
          done: data.filter((s: any) => s.status === 'done').length
        };
      })
    );
  }
}