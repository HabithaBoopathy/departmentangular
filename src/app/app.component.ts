import { Component, OnInit } from '@angular/core';
import { Department } from './models/department';
import { DepartmentService } from './services/department.service';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'TEST-convinience';
  department:Department;
  departments:Department[];

  constructor(                                                                                    
    private httpClient: HttpClient,
    private departmentService: DepartmentService

  ){
    this.department = new Department();
    this.departments = [];                                                
  }                             
  ngOnInit(): void {
    this.fetchDepartments();
}
reloadData() {
  this.department = new Department();
  this.fetchDepartments();
}

fetchDepartments() {
  console.log('Checkpoint 0');
  this.departmentService.getDepartments().subscribe(
    (data) => {
      this.departments = data;
    },
    (err) => {
      console.log(err);
    }
  );  
}

validateDepartmentData(): boolean {
  
  let flag = false;
  if (this.department.departmentId == '') {
    alert('Please enter a valid deaprtment Id');
  } else if (this.department.departmentName == '') {
    alert('Please enter a valid department Name');
  } 
   else {
    flag = true;
  }

  return flag;
}

onRegister() {
  if (this.validateDepartmentData()) {
   console.log('Checkpoint 1');
    //asynchronous vs synchronous programming
    this.departmentService.createDepartment(this.department).subscribe(
      (data) => {
        if (data) {
          console.log('Checkpoint 3');
          //reload data since new record has been added
          this.reloadData();
        } else {
          alert(
            'Error while creating department. Please look onto the backend logs'
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log('Checkpoint 2');
    
  }
}

onUpdate() {
  if (this.validateDepartmentData()) {
    this.departmentService.updateDepartment(this.department).subscribe(
      (data) => {
        if (data) {
          this.reloadData();
        } else {
          alert(
            'Error while updating department. Please look onto the backend logs'
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

onDelete(id: string) {
  this.departmentService.deleteDepartment(id).subscribe(
    (data) => {
      if (data) {
        this.reloadData();
      } else {
        alert(
          'Error while deleting department. Please look onto the backend logs'
        );
      }
    },
    (err) => {
      console.log(err);
    }
  );

}

/***public departmentsArray;

  hotelId = '';
  hotelName = '';
  

  onRegisterOld() {
    const hotelObj = {
      id: this.hotelId,
      hotelName: this.hotelName,
      pricePerNight: this.price,
      address: {
        city: this.city,
        country: this.country,
      },
      reviews: [],
    };

    console.log('The posted Object is : ');
    console.log(hotelObj);
    this.httpCLient
      .post('http://localhost:8080/hotels', hotelObj)
      .toPromise()
      .then((data) => {
        console.log('The Received Object : ');
        console.log(data);

        this.httpCLient
          .get(`http://localhost:8080/hotels`)
          .toPromise()
          .then((data) => {
            this.hotelsArray = data;
            // console.log(data)
            this.resetFieldsRegister();
          });
      });
  }

  onUpdateOld() {
    this.httpCLient
      .get(`http://localhost:8080/hotels/${this.hotelId}`)
      .toPromise()
      .then((data) => {
        data['hotelName'] = this.hotelName;
        data['pricePerNight'] = this.price;
        data['address']['city'] = this.city;
        data['address']['country'] = this.country;

        console.log(data);

        this.httpCLient
          .put(`http://localhost:8080/hotels/`, data)
          .toPromise()
          .then((data) => {
            console.log('updated.!');
            console.log(data);

            this.httpCLient
              .get(`http://localhost:8080/hotels`)
              .toPromise()
              .then((data) => {
                this.hotelsArray = data;
                this.resetFieldsRegister();
              });
          });
      });
  }

  onReviewOld() {
    //creating review
    const reviewObj = {
      userName: this.userName,
      rating: this.rating,
      approved: true,
    };

    console.log('Requesting Hotel Object');
    this.httpCLient
      .get(`http://localhost:8080/hotels/${this.hotelIdr}`)
      .toPromise()
      .then((data) => {
        console.log('get request successful');

        data['reviews'].push(reviewObj);

        console.log('updating hotel object with the review');
        this.httpCLient
          .post('http://localhost:8080/hotels', data)
          .toPromise()
          .then((data) => {
            console.log('Update success. The Received Object : ');
            console.log(data);

            this.httpCLient
              .get(`http://localhost:8080/hotels`)
              .toPromise()
              .then((data) => {
                this.hotelsArray = data;
                console.log('Hotel array updated');
                // console.log(this.hotelsArray)
                this.resetFieldsReview();
              });
          });
      });
  }

  resetFieldsRegister() {
    this.hotelId = '';
    this.hotelName = '';
    this.price = null;
    this.city = '';
    this.country = '';
  }

  resetFieldsReview() {
    this.userName = '';
    this.rating = null;
    this.hotelIdr = '';
  }

  myObj = {
    id: '4',
    hotelName: 'Radisson Blu',
    pricePerNight: 4500,
    address: {
      city: 'Coimbatore',
      country: 'India',
    },
    reviews: [
      {
        userName: 'Kannan',
        rating: 4,
        approved: true,
      },
    ],
  };

  btnClicked() {
    this.httpCLient
      .post('http://localhost:8080/hotels', this.myObj)
      .toPromise()
      .then((data) => {
        console.log(data);
      });
  }

  // dynObj = [
  //   JSON.stringify(this.dynObj1)
  // ]

  // jsons = JSON.stringify(this.jsonm);

  jsonTemplate = {
    id: '3',
    hotelName: 'Radisson Blu',
    pricePerNight: 4500,
    address: {
      city: 'Coimbatore',
      country: 'India',
    },
    reviews: [
      {
        userName: 'Kannan',
        rating: 4,
        approved: true,
      },
    ],
  };***/
}



