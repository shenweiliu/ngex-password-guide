import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
//import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { guideItem } from './password-validator';

@Component({
    //moduleId: module.id,
    selector: 'password-guide',
    templateUrl: './password-guide.component.html',
    styleUrls: ['./password-guide.component.css']
})
export class PasswordGuideComponent implements OnInit, OnChanges, OnDestroy {
    //control object won't trigger changes since object reference not changed.
    //Use "any", not "AbstractControl" type for work with custom added properties
    @Input() control: any; 
    @Input() itemList: Array<guideItem> = [];

    //Dummy binding value to trigger changes.
    @Input() passwordGuideTrigger: number = 0;

    //Relay control.isActive and used in HTML template.
    //(dynamically added property into AbstractControl renders error during Angular CLI build).
    private subscription_1!: Subscription;
    isControlActive: boolean = false;

    itemsForBlur: Array<guideItem> = [];

    constructor(private messageService: MessageService) {
    }
    
    ngOnInit() {
        let pThis: any = this;
        //Use messageService for event trigger.
        this.subscription_1 = this.messageService.subscribe('isPwdControlActive', (value) => {
            pThis.isControlActive = value;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        //Use triggers for refreshing data.
        let pThis: any = this;
        this.itemList.forEach((item: any, index: number) => {            
            if (pThis.control.isOriginalChanged) {
                if (item.scheme == 'ON-CHANGE') {
                    //Set base status for any element without pending and with value changed.
                    item.status = 'VALID';
                }
                else {
                    item.status = 'PENDING';
                }
            }
            else {
                //Keep default status.
                item.status = '';
            }
            for (const key in pThis.control.errors) {
                if (pThis.control.errors.hasOwnProperty(key)) {
                    //Set status to 'INVALID' for element in errors object 
                    if (key == item.key) {
                        item.status = 'INVALID';
                        break;
                    }
                }
            }
        });        
    }

    showPasswordGuide() {        
        let rtn: boolean = false; 
        if (this.isControlActive) {
            //Show guide panel whenever control get focused.
            rtn = true;
        }
        else {
            if (this.control.isOriginalChanged && this.control.errors) {
                //Show guide panel if input value changed with any validation error.
                rtn = true;
            }
            else {
                //Do not use control.isOriginalChanged checker here.
                //We need to show validation message even if control is visited but value removed.
                if ((this.control.dirty || this.control.touched) && !this.control.value) {
                    this.itemsForBlur = this.itemList.filter(el => el.status.indexOf('INVALID') !== -1);
                }

                //Hide password-guide panel in all other conditions. 
                rtn = false;
            }                      
        }
        return rtn;
    }

    ngOnDestroy() {
        this.subscription_1.unsubscribe();
    }
}
