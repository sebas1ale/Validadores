//student-view.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { StudentService } from 'src/app/services/student.service';

//student-view-component.ts
@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: Student = new Student();

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }
  //constructor(private studentService: StudentAsyncService, private route: ActivatedRoute) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));
    
    const result = this.studentService.getById(studentId);
    this.student = result !== null ? result : new Student();

    /*
    this.studentService.getById(studentId)
      .then(response => {
        this.student = response;
      })
      .catch(error => {
        console.log(error);
      })
      */
  }
}