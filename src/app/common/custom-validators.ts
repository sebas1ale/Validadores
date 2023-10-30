import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { StudentAsyncService } from "../services/student-async.service";
import { StudentService } from "../services/student.service";
import { HttpClient } from "@angular/common/http";

export class CustomValidators {

  static forbiddenWords(forbiddenWords: RegExp): ValidatorFn {        
        return (control: AbstractControl): {[key: string]: any} | null => {
          const forbidden = forbiddenWords.test(control.value);

          return forbidden ? { 'forbiddenWords': {value: control.value} } : null;
        };
    }

    static lettersOnly(): ValidatorFn {
        let regExp: RegExp = /^[a-zA-Z\s]*$/;

        return (control: AbstractControl): {[key: string]: any} | null => {                     
            const lettersOnly = regExp.test(control.value);

            return !lettersOnly ? { 'lettersOnly': {value: control.value} } : null;
        };
    }

    static emailExists(studentService: StudentAsyncService): AsyncValidatorFn {       
      return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
        if (control.value == '') {
          return Promise.resolve(null);
        } else {
          return studentService.getByEmail(control.value)
            .then(response => {
              return response !== null ? { 'emailExists': { value: control.value } } : null;
            })
            .catch(() => {
              return null; // Manejar errores aquí si es necesario
            });
        }
      };
    }
    
}
