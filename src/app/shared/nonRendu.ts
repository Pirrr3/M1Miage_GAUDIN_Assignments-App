import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonRendu]'
})
export class NonRendu {

  constructor(el:ElementRef) { 
    const element = el.nativeElement;
    element.style.fontWeight = 'bold';
    element.style.color = 'red';
    element.style.border = '2px solid red';
    element.style.padding = '10px';
    element.style.margin = '10px';

   //element.innerText = "Non Rendu ! Non Rendu ! Non Rendu !" + element.innerText;
  }

}
