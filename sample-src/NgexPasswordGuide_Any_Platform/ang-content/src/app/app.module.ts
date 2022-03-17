import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InputValidatorModule } from './ngex-input-validator/input-validator.module';
import { PasswordGuideModule } from './ngex-password-guide/password-guide.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        InputValidatorModule,
        PasswordGuideModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
