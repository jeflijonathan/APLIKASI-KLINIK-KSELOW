import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update',
  imports: [],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
  @Input() id: string = '';
  @Input() opened: boolean = true;

  isOpenDialog() {
    this.opened = true;
  }
}
