import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../dto/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }
  getAllCustomers(): Observable <Customer[]> {
    return this.http.get<Customer[]>('http://localhost:8080/api/v3/customers');
  }
  deleteCustomer(customerId: string): Observable<null> {
    return this.http.delete<null>('http://localhost:8080/api/v3/customers' + `/${customerId}`);
  }
  saveCustomer(customer: Customer): Observable<null> {
    return this.http.post<null>('http://localhost:8080/api/v3/customers', customer);
  }
  updateCustomer(customer: Customer): Observable<null> {
    return this.http.put<null>('http://localhost:8080/api/v3/customers' + `/${customer.id}`, customer);
  }

}
