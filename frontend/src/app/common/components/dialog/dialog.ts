import { Component, Inject, Input, Output, EventEmitter, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class Dialog {
  @Input() title? = '';
  @Input() class? = '';
  @Input() opened = true;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<any>();
  @Output() submitted = new EventEmitter<any>();

  constructor(@Optional() private dialogRef?: MatDialogRef<Dialog>) {}

  onSubmit(): void {
    this.submitted.emit(true);

    if (this.dialogRef) {
      this.dialogRef.close(true);
    } else {
      this.closeDialog();
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    } else {
      this.closed.emit({ action: 'cancel' });
      this.closeDialog();
    }
  }

  private closeDialog(): void {
    this.opened = false;
    this.openedChange.emit(false);
  }
}
