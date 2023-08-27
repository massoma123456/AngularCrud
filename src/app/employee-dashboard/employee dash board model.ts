 export class EmployeeModel{
  static id(id: any) {
    throw new Error('Method not implemented.');
  }
  id:number =0;
  firstname: string='';
  lastname: string='';
  email: string='';
  mobile: string='';
  salary: string='';
 }