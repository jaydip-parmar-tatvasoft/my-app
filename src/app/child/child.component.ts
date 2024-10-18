import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush strategy
})
export class ChildComponent {
  @Input() data!: number[]; // Input property for an array

  onRender(): boolean {
    console.log('OnReder');
    return true;
  }
}
