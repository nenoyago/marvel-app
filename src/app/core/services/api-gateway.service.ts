import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as md5 from 'md5';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment as ENV } from 'src/environments/environment';

interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface IMarvelDataResponse<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T;
}

interface IMarvelApiResponse<T> {
  code: number;
  status: string;
  etag: string;
  data: IMarvelDataResponse<T>;
}

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  private readonly privateKey!: string;
  private readonly publicKey!: string;

  constructor(private http: HttpClient) {
    this.privateKey = ENV.MARVEL_PRIVATE_API_KEY;
    this.publicKey = ENV.MARVEL_PUBLIC_API_KEY;
  }

  get<T>(
    endpoint: string,
    options: IRequestOptions = {
      params: this.params,
    }
  ): Observable<IMarvelDataResponse<T>> {
    const url = encodeURI(this.service + endpoint);
    return this.http.get<IMarvelApiResponse<T>>(url, options).pipe(
      take(1),
      map(res => res.data)
    );
  }

  post<T>(
    endpoint: string,
    body: any,
    options: IRequestOptions = {
      params: this.params,
    }
  ): Observable<IMarvelDataResponse<T>> {
    const url = encodeURI(this.service + endpoint);
    return this.http.post<IMarvelApiResponse<T>>(url, body, options).pipe(
      take(1),
      map(res => res.data)
    );
  }

  put<T>(
    endpoint: string,
    body: any,
    options: IRequestOptions = {
      params: this.params,
    }
  ): Observable<IMarvelDataResponse<T>> {
    const url = encodeURI(this.service + endpoint);
    return this.http.put<IMarvelApiResponse<T>>(url, body, options).pipe(
      take(1),
      map(res => res.data)
    );
  }

  patch<T>(
    endpoint: string,
    body: any,
    options: IRequestOptions = {
      params: this.params,
    }
  ): Observable<IMarvelDataResponse<T>> {
    const url = encodeURI(this.service + endpoint);
    return this.http.patch<IMarvelApiResponse<T>>(url, body, options).pipe(
      take(1),
      map(res => res.data)
    );
  }

  delete<T>(
    endpoint: string,
    options: IRequestOptions = {
      params: this.params,
    }
  ): Observable<IMarvelDataResponse<T>> {
    const url = encodeURI(this.service + endpoint);
    return this.http.delete<IMarvelApiResponse<T>>(url, options).pipe(
      take(1),
      map(res => res.data)
    );
  }

  private get service(): string {
    const url = ENV.MARVEL_API_URL.endsWith('/')
      ? ENV.MARVEL_API_URL.substring(0, ENV.MARVEL_API_URL.length - 1)
      : ENV.MARVEL_API_URL;
    return url;
  }

  private get params(): HttpParams {
    const time = new Date().getTime();
    const hash = md5(`${time}${this.privateKey}${this.publicKey}`);
    return new HttpParams()
      .set('ts', time)
      .set('apikey', this.publicKey)
      .set('hash', hash);
  }
}
