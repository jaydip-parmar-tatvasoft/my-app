import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appInputHover]',
  standalone: true,
})
export class InputHoverDirective {
  @Input() appInputHover: HTMLInputElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (this.appInputHover?.value) {
      this.changeBackGroundColor(this.appInputHover?.value);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackGroundColor('12px');
  }

  changeBackGroundColor(color: string) {
    console.log(color);
    this.renderer.setStyle(this.el.nativeElement, 'fontSize', color);
  }
}
