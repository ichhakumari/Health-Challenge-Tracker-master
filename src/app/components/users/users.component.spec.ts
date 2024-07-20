import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { User } from './users.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        MatPaginatorModule,
        NoopAnimationsModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataSource when loadUsers is called', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 50 }],
        totalWorkouts: 1,
        totalMinutes: 50,
      },
      {
        id: 2,
        name: 'Jane Doe',
        workouts: [{ type: 'Yoga', minutes: 50 }],
        totalWorkouts: 1,
        totalMinutes: 50,
      },
    ];
    component.dataSource.data = mockUsers;
    component.loadUsers();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should have paginator after view init', () => {
    component.ngAfterViewInit();
    expect(component.paginator).toBeTruthy();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });
});
