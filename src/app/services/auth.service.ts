import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
   private api = 'http://localhost:5195/api/PurchaseRequest';
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post('http://localhost:5195/api/auth/register', data);
  }

  login(data: any) {
    return this.http.post('http://localhost:5195/api/auth/login', data);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      const dec: any = jwtDecode(t);
      return (
        dec.role ||
        dec.roles ||
        dec['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        null
      );
    } catch {
      return null;
    }
  }

  getUserId(): number | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      const dec: any = jwtDecode(t);
      const v = dec.id ?? dec.sub ?? dec.nameid ?? null;
      return v != null ? Number(v) : null;
    } catch {
      return null;
    }
  }

  getStocks() {
    return this.http.get<any[]>(this.api);
  }

  updateSalePrice(id: number, price: number) {
    return this.http.put(`${this.api}/${id}/sale-price`, price);
  }
}
