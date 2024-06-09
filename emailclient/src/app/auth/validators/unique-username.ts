import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {
    }

    validate = (control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const { value } = control;
        return this.authService.usernameAvailable(value).pipe(map(() => {
            //only success can go into here
            return null;
        }), catchError((err => {
            //of is same as Observable
            console.log(err);

            if (err.error.username) {
                return of({ nonUniqueUsername: true });
            }

            return of({ noConnection: true });
        })));
    }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
}
