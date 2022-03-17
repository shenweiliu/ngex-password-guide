import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgexTooltipDirective } from './ngex-tooltip.directive';


@NgModule({
    declarations: [
        NgexTooltipDirective
    ],
    imports: [
        CommonModule
    ],
    providers: [       
    ],
    exports: [
        NgexTooltipDirective
    ]
})
export class NgexTooltipModule {}
