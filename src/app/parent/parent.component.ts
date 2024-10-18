import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, CommonModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush strategy
})
export class ParentComponent {
  numbers: number[] = [1]; // Initialize an array
  showcontent = false;
  incrementNumber() {
    this.numbers = [...this.numbers, this.numbers.length + 1]; // Create a new array reference // Add a number without changing the reference
  }

  onKeyUp(event: Event) {
    console.log('On key Up');
  }

  OnChange() {
    this.showcontent = !this.showcontent;
  }
}
