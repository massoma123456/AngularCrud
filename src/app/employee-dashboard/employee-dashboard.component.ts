import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../shared/shared/api.service';
import { EmployeeModel } from './employee dash board model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  Formvalue!: FormGroup;
  EmployeeModelObj: EmployeeModel = new EmployeeModel();
  employeedata !: any;
  
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.Formvalue = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],

    })
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.EmployeeModelObj.firstname = this.Formvalue.value.firstName;
    this.EmployeeModelObj.lastname = this.Formvalue.value.lastName;
    this.EmployeeModelObj.email = this.Formvalue.value.email;
    this.EmployeeModelObj.mobile = this.Formvalue.value.mobile;
    this.EmployeeModelObj.salary = this.Formvalue.value.salary;


    console.log("this is form control", this.EmployeeModelObj)
    this.api.postEmployee(this.EmployeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("employee successfully added")
        let ref = document.getElementById("cancel");
        ref?.click();
        this.Formvalue.reset()
        this.getAllEmployee();
      },
        err => {
          alert("something is wrong")

        })
  }
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeedata = res;
      })
  }
  deleteEmployee( row:any) {
    this.api.deleteEmployee(row.id)
      .subscribe((res:any) => {
        alert("employee deleted");
      })
   
  }
  onEdit(row: any) {
    this.EmployeeModelObj.id=row.id;
    this.Formvalue.controls['firstName'].setValue(row.firstname)
    this.Formvalue.controls['lastName'].setValue(row.lastname)
    this.Formvalue.controls['email'].setValue(row.email)
    this.Formvalue.controls['mobile'].setValue(row.mobile)
    this.Formvalue.controls['salary'].setValue(row.salary)
 
  }
  updateEmployee() {
    this.EmployeeModelObj.firstname = this.Formvalue.value.firstName;
    this.EmployeeModelObj.lastname = this.Formvalue.value.lastName;
    this.EmployeeModelObj.email = this.Formvalue.value.email;
    this.EmployeeModelObj.mobile = this.Formvalue.value.mobile;
    this.EmployeeModelObj.salary = this.Formvalue.value.salary;

    this.api.updateEmployee (this.EmployeeModelObj.id,this.EmployeeModelObj)
      .subscribe(res => {
        alert("employee updated");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.Formvalue.reset()
        this.getAllEmployee()
      })
  }
}


 