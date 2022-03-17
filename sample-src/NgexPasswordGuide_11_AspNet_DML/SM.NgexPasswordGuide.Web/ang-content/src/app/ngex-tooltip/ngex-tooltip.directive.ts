import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[ngexTooltip]'
})
export class NgexTooltipDirective {
    @Input('ngexTooltip') tooltipTitle: string = '';
    @Input() animationDelay: string = '400';
    /* Provides option to have CSS class sets for individual host element.
       Default to 'ngex-tooltip' CSS class set.
    */
    @Input() baseCssClass: string = 'ngex-tooltip';   
    /* offset may be needed for adjusting spaces between host and tooltip
       when scrolling down on page with non-scrollabe header.     
    */
    @Input() offsetTop: string = '10';
    @Input() offsetBottom: string = '9';
    /* If there is sticky header and needs to auto bottom tooltip against header bottom 
       instead of overlay on header, specify autoBottomOffset value to header height value.     
    */
    @Input() autoBottomOffset: string = '0';
    /* If maxWidth is manually set to larger than hostPos.width, then
       the arrow position needs to be moved to left side/edge to make better looking.
       Use individual baseCssClass sets for this host element.
       Change the *% value in the "*:after" CSS to obtain desired results.
    */
    @Input() maxWidth: string = '';
    @Input() arrowPosition: string = 'center'; //'center' or 'left'
    tooltip!: HTMLElement;  
    
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        if (!this.tooltip && this.tooltipTitle) {
            this.show();
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.tooltip) {
            this.hide();            
        }
    }

    //Hide tooltip for showing it while scrolling. 
    @HostListener('window:scroll') onWindowScroll() {
        if (this.tooltip) {
            //Only set opacity to 0 here. Will anyway remove tooltip element with mouseleave event.
            this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-show`);
        }
    }

    show() {
        //Create tooltip element.
        this.tooltip = this.renderer.createElement('span');
        this.renderer.appendChild(
            this.tooltip,
            this.renderer.createText(this.tooltipTitle)
        );
        this.renderer.appendChild(document.body, this.tooltip);
        //this.renderer.appendChild(this.el.nativeElement, this.tooltip);

        //Set default css classes.
        this.renderer.addClass(this.tooltip, this.baseCssClass);

        //Get host element positions.
        const hostPos: any = this.el.nativeElement.getBoundingClientRect();

        //tootipPos.height is based on max-width setting that varies with title text length and spaces.
        //Default max-width
        let adjMaxWidth: number = hostPos.width - 2;
        if (this.maxWidth) {
            adjMaxWidth = parseInt(this.maxWidth);
        }
        this.renderer.setStyle(this.tooltip, 'max-width', `${adjMaxWidth}px`);

        //Window scroll top.        
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        //Get tooltip element positions.        
        const tooltipPos: any = this.tooltip.getBoundingClientRect();
        
        //Adjust positions.        
        let tipTop: number = 0;
        let topPos: number = hostPos.top - tooltipPos.height - parseInt(this.offsetTop);
        let bottomPos: number = hostPos.bottom + parseInt(this.offsetBottom);
        if (topPos - parseInt(this.autoBottomOffset) > 0) {
            //Placed to host top.
            tipTop = topPos;            
            this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-bottom`);
            this.renderer.addClass(this.tooltip, `${this.baseCssClass}-top`);
        }
        else {
            //placed to host bottom.
            tipTop = bottomPos;
            this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-top`);
            this.renderer.addClass(this.tooltip, `${this.baseCssClass}-bottom`);
        }
        
        let tipLeft: number = hostPos.left + 2;
        //leftPos = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        
        //Tooltip arrow positions.
        if ((tipLeft + adjMaxWidth) < window.innerWidth) {
            this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-arrow-end`);
            if (this.arrowPosition == 'center') {
                this.renderer.addClass(this.tooltip, `${this.baseCssClass}-arrow-center`);
            }
            else if (this.arrowPosition == 'left') {
                this.renderer.addClass(this.tooltip, `${this.baseCssClass}-arrow-left`);
            }
        }
        else {
            //Too right from window edge.
            tipLeft = window.innerWidth - adjMaxWidth - 15; //15px for possible scrollbar width.
            
            if (this.arrowPosition == 'center') {
                this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-arrow-center`);
            }
            else if (this.arrowPosition == 'left') {
                this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-arrow-left`);                
            }
            this.renderer.addClass(this.tooltip, `${this.baseCssClass}-arrow-end`);
        }        

        //Set tooltip position.        
        this.renderer.setStyle(this.tooltip, 'top', `${tipTop + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${tipLeft}px`);        

        //Animation.
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.animationDelay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.animationDelay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.animationDelay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.animationDelay}ms`);

        //Show tooltip.
        this.renderer.addClass(this.tooltip, `${this.baseCssClass}-show`);
    }

    hide() {
        //Hide tooltip.
        this.renderer.removeClass(this.tooltip, `${this.baseCssClass}-show`);
       
        //Remove tooltip from body element.
        let pThis: any = this;
        setTimeout(() => {
            pThis.renderer.removeChild(document.body, pThis.tooltip);
            pThis.tooltip = null;
        }, parseInt(pThis.animationDelay) + 50); //SW: No need for radix.        
    }    
}
