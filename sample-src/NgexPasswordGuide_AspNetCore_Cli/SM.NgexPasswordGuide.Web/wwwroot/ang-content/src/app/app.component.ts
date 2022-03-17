import { Component, ViewChild, ElementRef, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from './ngex-password-guide/message.service';
import { PasswordValidators, guideItem } from './ngex-password-guide/password-guide.module';
import { Validator2 } from './ngex-input-validator/input-validator.module';
import { passwordItemList, commonlyUsedpasswords } from './local-data';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('passwordElem', { static: true }) passwordElem: ElementRef;

    formSignup!: FormGroup;
    originalFormValues: any = {};
    passwordItemList!: Array<guideItem>;
    commonlyUsedpasswords: Array<string>;
    activeControlName: string = '';

    //Dummy data item to trigger changes.
    passwordGuideTrigger: number = 0;
    
    constructor(private messageService: MessageService) {
    }

    ngOnInit() {
        this.passwordItemList = passwordItemList;
        this.commonlyUsedpasswords = commonlyUsedpasswords;

        this.formSignup = new FormGroup({
            userName: new FormControl('', Validator2.required({label: 'Username'})),
            password: new FormControl('', [Validators.compose([
                PasswordValidators.required(),
                PasswordValidators.minLength(8),
                PasswordValidators.patternMatch(/(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).+/, 'hasMixOfCaseNumber'),                
                PasswordValidators.patternMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'hasSpecialCharacter'),                
                //PasswordValidators.patternMatch(/(\b(?:([A-Za-z0-9])(?!\2{2}))+\b)/, 'maxRepeatChars')
                PasswordValidators.patternMatch(/(\b(?:(.)(?!\2{2}))+\b)/, 'maxRepeatChars')
            ])]),            
            confirmPassword: new FormControl('', Validator2.required({ label: 'Confirm Password' }))
            //confirmPassword: new FormControl('')
        }, {
            validators: [
                PasswordValidators.fieldCannotContain({ nameA: 'userName', nameB: 'password', minLength: 5 }),
                Validator2.fieldMatch2({ nameA: 'password', nameB: 'confirmPassword', label: 'Password' })
        ]});

        //Set defaults to all controls for insert new values.
        this.formSignup.reset({
            userName: '',
            password: '',
            confirmPassword: ''
        });

        //Add custom properties into form controls and populate originalFormValues.
        //Since no types in AbstractControl, these properties not working in HTML template
        //(Angular CLI build will render errors).
        //If updating existing form, need to populate form with original data before this routine.  
        for (const prop in this.formSignup.controls) {
            if (this.formSignup.controls.hasOwnProperty(prop)) {
                this.formSignup.controls[prop]['showInvalid'] = true;
                this.formSignup.controls[prop]['isActive'] = false;
                this.formSignup.controls[prop]['isOriginalChanged'] = false;
                this.originalFormValues[prop] = this.formSignup.controls[prop].value;
            }
        }

        let pThis: any = this;
        this.formSignup.controls.userName.valueChanges.subscribe(value => {
            pThis.passwordGuideTrigger++;
        });

        this.formSignup.controls.password.valueChanges.subscribe(value => {            
            pThis.passwordGuideTrigger++;
        });

        this.formSignup.valueChanges.subscribe(value => {
            //Update custom isOriginalChanged property value.
            for (const item in pThis.originalFormValues) {
                if (this.formSignup.controls.hasOwnProperty(item)) {
                    for (const prop in pThis.formSignup.controls) {
                        if (this.formSignup.controls.hasOwnProperty(prop) && prop == item) {
                            let isChanged: boolean = false;
                            if (pThis.formSignup.controls[prop].value !== pThis.originalFormValues[item]) {
                                isChanged = true;
                            }
                            pThis.formSignup.controls[prop].isOriginalChanged = isChanged;
                            break;
                        }
                    }
                }
            }            
        });        
    }
        
    //Set control status on focus or on blur.
    setControlOnFocusBlur(isFocused: boolean, control: any = null, setShowInvalid: boolean = false) {        
        this.messageService.broadcast('isPwdControlActive', isFocused);

        if (setShowInvalid) {            
            control.showInvalid = !isFocused;
        }
    }

    submit() {
        if (this.commonlyUsedpasswords.indexOf(this.formSignup.value.password) >= 0) {
            //On-submit validation simulating service or database call.
            this.formSignup.controls.password.setErrors({ restrictCommonPasswords: true });
            this.passwordGuideTrigger++;
            return;
        }        

        let te: any = this.formSignup;
    }
}
