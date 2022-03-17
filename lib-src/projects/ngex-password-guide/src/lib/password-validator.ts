import { FormArray, AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class containArgs {
    nameA: string = '';
    nameB: string = '';
    minLength?: number;
}
export class guideItem {
    key: string = '';
    status: string = ''; //''/undefined, 'INVALID', 'VALID', 'PENDING'
    label: string = '';
    scheme: string = ''; //'ON-CHANGE', 'ON-BLUR', 'ON-SUBMIT' 
}

//For password hints/validators, display labels need to be shown even there is no propety in errors object. 
export class PasswordValidators {
    //required.
    static required(errorProperty: string = ''): ValidatorFn {
        //Need return "any", not explicit "ValidationErrors" for build with Angular CLI 12 and above.
        //Otherwise error "Type 'null' is not assignable to type 'ValidationErrors'".
        return (fc: AbstractControl): any => {
            const isValid: boolean = fc.value;
            let errRtn: any = {};
            if (errorProperty) {
                errRtn[errorProperty] = true;
            }
            else {
                errRtn.required = true;
            }
            return isValid ? null : errRtn;
        }
    }

    //minLength.
    static minLength(argValue: number, errorProperty: string = ''): ValidatorFn {
        return (fc: AbstractControl): any => {
            if (fc.value) {
                const isValid: boolean = (fc.value.length >= argValue);
                let errRtn: any = {};
                if (errorProperty) {
                    errRtn[errorProperty] = true;
                }
                else {
                    errRtn.minLength = true;
                }
                return isValid ? null : errRtn;
            }
            return null;
        }
    }

    //patternMatch
    static patternMatch(regex: RegExp, errorProperty: string): ValidatorFn {
        return (fc: AbstractControl): any => {
            if (fc.value) {
                //Test value against regexp supplied.
                const isValid = regex.test(fc.value);
                let errRtn: any = {};
                errRtn[errorProperty] = true;
                return isValid ? null : errRtn;
            }
            return null;
        };
    }

    //fieldContain is set for form group and property is added into control-B errors (compose mode).
    //control-B cannot contain value from control-A and vice versa.
    static fieldCannotContain(args: containArgs): ValidatorFn {        
        return (fc: AbstractControl): any => {
            if (!args) return null;
            const controlA: any = fc.get(args.nameA);
            const controlB: any = fc.get(args.nameB);
            if (!args.minLength) args.minLength = 1;
            if (controlA && controlB && controlA.value.length >= args.minLength && controlB.value.length >= args.minLength) {
                const isValid: boolean = !(controlB.value.toLowerCase().indexOf(controlA.value.toLowerCase()) >= 0) &&
                    !(controlA.value.toLowerCase().indexOf(controlB.value.toLowerCase()) >= 0);
                if (!isValid) {
                    if (!controlB.errors) {
                        //There is no other error.
                        controlB.setErrors({ fieldContain: true });
                    }
                    else {
                        //At least one other error exists. Just add property, which doesn't set invalid status.
                        controlB.errors['fieldContain'] = true;
                    }
                }
                else {
                    if (controlB.errors) {
                        delete controlB.errors['fieldContain'];

                        if (Object.keys(controlB.errors).length < 1) {
                            //If not other error.
                            controlB.setErrors(null);
                        }
                    }
                }                
            }
            else {
                //Reset to valid.
                if (controlB.errors) {
                    delete controlB.errors['fieldContain'];

                    if (Object.keys(controlB.errors).length < 1) {
                        //If not other error.
                        controlB.setErrors(null);
                    }
                }
            }
            //Do not return error object at group level.
            return null;
        }
    }    
}






