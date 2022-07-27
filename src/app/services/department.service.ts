import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { Configuration } from '../app/configuration';


@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  createDepartment(department: Department): Observable<boolean> {
    return this.http.post<boolean>(`${Configuration.serverURL}departments`, department);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${Configuration.serverURL}departments`);
  }

  updateDepartment(department: Department): Observable<boolean> {
    return this.http.put<boolean>(`${Configuration.serverURL}departments`, department);
  }

  deleteDepartment(departmentId: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${Configuration.serverURL}departments/${departmentId}`
    );
  }
}
