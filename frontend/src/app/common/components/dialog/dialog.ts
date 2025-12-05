import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css'],
})
export class Dialog {
  @Input() title = '';
  @Input() class = '';
  @Input() opened = true;

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<any>();
  @Output() submitted = new EventEmitter<any>();

  dialogRef?: { close: (value: any) => void };

  onSubmit() {
    this.submitted.emit(true);
    this.closeDialog();

    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  get hasSubmit(): boolean {
    return this.submitted.observers.length > 0;
  }

  onCancel() {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    } else {
      this.closed.emit({ action: 'cancel' });
      this.closeDialog();
    }
  }

  private closeDialog() {
    this.opened = false;
    this.openedChange.emit(false);
  }
}
