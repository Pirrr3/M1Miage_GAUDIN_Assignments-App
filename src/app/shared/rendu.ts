import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class Rendu {

  constructor(el:ElementRef) { 
    const element = el.nativeElement;
    element.style.fontWeight = 'bold';
    element.style.color = 'green';
    element.style.border = '2px solid green';
    element.style.padding = '10px';
    element.style.margin = '10px';

    //element.innerText = "Rendu ! Rendu !Rendu !" + element.innerText;
  }

}
