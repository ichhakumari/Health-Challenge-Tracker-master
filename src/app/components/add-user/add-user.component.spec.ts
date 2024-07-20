import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AddUserComponent } from './add-user.component';
import { AddUserService } from '@/app/services/add-user/add-user.service';
import { of } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let addUserServiceSpy: jasmine.SpyObj<AddUserService>;
  let dialog: MatDialog;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AddUserService', ['addUser']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        AddUserComponent, // Importing the standalone component
      ],
      providers: [{ provide: AddUserService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    addUserServiceSpy = TestBed.inject(
      AddUserService
    ) as jasmine.SpyObj<AddUserService>;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form after submission', async () => {
    addUserServiceSpy.addUser.and.returnValue(true); // Ensure the service call succeeds

    component.name = 'Test User';
    component.workoutMinutes = 60;
    component.workoutType = 'Cycling';
    fixture.detectChanges();

    await fixture.whenStable();

    const form = {
      valid: true,
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;
    component.onSubmit(form);

    expect(component.name).toBeNull();
    expect(component.workoutMinutes).toBeNull();
    expect(component.workoutType).toBeNull();
    expect(form.resetForm).toHaveBeenCalled();
  });

  it('should open dialog on openDialog call', () => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
