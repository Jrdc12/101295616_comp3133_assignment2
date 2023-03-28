import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES } from '../services/graphql-queries';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_EMPLOYEES,
      })
      .valueChanges.subscribe((result: any) => {
        this.employees = result?.data?.getEmployees;
      });
  }
}
