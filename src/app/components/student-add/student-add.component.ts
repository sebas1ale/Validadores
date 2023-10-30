import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/common/custom-validators';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  message: string = '';

  studentForm = new FormGroup({
    firstName: new FormControl('', [ Validators.required, CustomValidators.lettersOnly() ]),
    lastName: new FormControl('', [ Validators.required, CustomValidators.lettersOnly() ]),
    dni: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email, CustomValidators.forbiddenWords(/email.com/)],[ CustomValidators.emailExists(this.studentAsyncService)]),
    address: new FormControl('')
  });
   
  constructor(private studentService: StudentService, private studentAsyncService: StudentAsyncService) { }
  //constructor(private studentService: StudentAsyncService) { }

  ngOnInit() {
    
  }

  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get dni() { return this.studentForm.get('dni'); }
  get email() { return this.studentForm.get('email'); }
  get address() { return this.studentForm.get('address'); }

  onSubmit(){
    let student = new Student();
    student.firstName = this.firstName?.value || '';
    student.lastName = this.lastName?.value || '';
    student.dni = (this.dni?.value || 0) as number;
    student.email = this.email?.value || '';
    student.address = this.address?.value || '';

    this.studentService.add(student);

    this.studentForm.reset();

    /*
    this.studentService.add(student)
      .then(response  => {
        this.message = "Student successfully added";
      })
      .catch(error =>{
        this.message = "An error has occurred!";
      })
      */
  }
}
