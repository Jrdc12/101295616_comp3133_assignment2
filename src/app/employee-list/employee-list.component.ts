import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../services/graphql.service';
import { GET_EMPLOYEES } from '../services/graphql-queries';
import { EmployeeInput } from '../interfaces/EmployeeInput';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  showForm = false;
  addForm: FormGroup;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_EMPLOYEES,
      })
      .valueChanges.subscribe((result: any) => {
        this.employees = result?.data?.getEmployees;
      });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onDelete(id: string) {
    this.graphqlService.deleteEmployee(id).subscribe(
      ({ data }) => {
        // Update the employees array to remove the deleted employee
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onEdit(employee: any) {
    // Set the values of the form fields to the values of the employee being edited
    this.addForm.setValue({
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      salary: employee.salary,
    });

    // Set the showForm flag to true to show the form
    this.showForm = true;

    // Update the submit function to call the editEmployee mutation instead
    this.onSubmit = () => {
      const { firstName, lastName, email, gender, salary } = this.addForm.value;
      const employeeInput: EmployeeInput = {
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
        salary,
      };
      this.graphqlService.editEmployee(employee.id, employeeInput).subscribe(
        ({ data }) => {
          // Update the employees array with the updated employee
          const index = this.employees.findIndex((e) => e.id === employee.id);
          this.employees[index] = data.editEmployee;

          // Hide the form and reset the form fields
          this.showForm = false;
          this.addForm.reset();
          this.onSubmit = () => {
            this.onSubmit();
          };
        },
        (error) => {
          console.error(error);
        }
      );
    };
  }

  onSubmit() {
    const { firstName, lastName, email, gender, salary } = this.addForm.value;
    const employeeInput: EmployeeInput = {
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      salary,
    };
    this.graphqlService.createEmployee(employeeInput).subscribe(
      ({ data }) => {
        // Update the employees array with the newly created employee
        this.employees = [...this.employees, data.createEmployee];

        // Hide the form and reset the form fields
        this.showForm = false;
        this.addForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
