import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
    static strong(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if(!value)
            return null;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasNonAlphanumeric = /[\W_]/.test(value);
        const minLength = value.length >= 12;

        const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasNonAlphanumeric && minLength;
        return !passwordValid ? {strong: true} : null;
    }

}