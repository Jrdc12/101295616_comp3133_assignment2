import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOGIN_MUTATION } from './graphql-queries';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  query<T>(query: any, variables?: any): Observable<T> {
    return this.apollo
      .query<T>({
        query,
        variables,
      })
      .pipe(map((res) => res.data));
  }

  mutation<T>(mutation: any, variables?: any): Observable<T> {
    return this.apollo
      .mutate<T>({
        mutation,
        variables,
      })
      .pipe(map((res) => res.data || ({} as T)));
  }

  login(email: string, password: string): Observable<any> {
    return this.mutation<any>(LOGIN_MUTATION, {
      input: {
        email,
        password,
      },
    });
  }
}
