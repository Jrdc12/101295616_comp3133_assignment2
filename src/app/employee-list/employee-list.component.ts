import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.graphqlService.getEmployees().subscribe((result) => {
      console.log(result);
      this.employees = result.data.getEmployees;
    });
  }
}
