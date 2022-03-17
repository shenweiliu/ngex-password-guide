import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { PasswordValidators, containArgs, guideItem } from './password-validator';
import { PasswordGuideComponent } from './password-guide.component';
import { NgexTooltipModule } from '../ngex-tooltip/ngex-tooltip.module';

export { PasswordValidators, containArgs, guideItem } from './password-validator';
export { PasswordGuideComponent } from './password-guide.component';

@NgModule({
    declarations: [
        PasswordGuideComponent
    ],
    imports: [
        CommonModule,
        NgexTooltipModule
    ],
    providers: [
        MessageService
    ],
    exports: [
        PasswordGuideComponent
    ]
})
export class PasswordGuideModule {}
