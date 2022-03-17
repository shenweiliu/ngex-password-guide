import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validator2 } from './reactive-validator';
import { ValueArgs, RangeArgs, CompareArgs, ValidatorCommon } from './validator-common';
import { ValidateErrorComponent } from './validate-error.component';

export { Validator2 } from './reactive-validator';
export { ValueArgs, RangeArgs, CompareArgs, ValidatorCommon } from './validator-common';
export { ValidateErrorComponent } from './validate-error.component';

@NgModule({
    declarations: [
        ValidateErrorComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [        
    ],
    exports: [
        ValidateErrorComponent
    ]
})
export class InputValidatorModule {}
