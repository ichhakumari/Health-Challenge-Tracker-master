import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddUserComponent } from '@/app/components/add-user/add-user.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
    });

    return dialogRef.afterClosed();
  }
}