import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete',
  imports: [],
  template: `<p>Delete works!</p>`,
  styleUrl: './Delete.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Delete { }
