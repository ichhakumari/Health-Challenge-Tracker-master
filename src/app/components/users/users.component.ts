import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { User } from '@/app/components/users/users.model';
import { workoutOptions } from '@/app/components/add-user/add-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'workouts',
    'totalWorkouts',
    'totalMinutes',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  workoutOptions = [{ value: 'all', viewValue: 'All' }, ...workoutOptions];
  selectedWorkoutType: string = 'all';
  searchTerm: string = '';

  ngOnInit() {
    this.loadUsers();
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    const workoutDataString = localStorage.getItem('workoutData');
    if (workoutDataString) this.dataSource.data = JSON.parse(workoutDataString);
  }

  applyFilter() {
    const filterObject = {
      searchTerm: this.searchTerm,
      workoutType: this.selectedWorkoutType,
    };
    this.dataSource.filter = JSON.stringify(filterObject);
  }

  search(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.applyFilter();
  }

  filterByWorkoutType(event: MatSelectChange) {
    this.selectedWorkoutType = event.value;
    this.applyFilter();
  }

  createFilter(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const filterObject = JSON.parse(filter);
      const searchTerm = filterObject.searchTerm;
      const workoutType = filterObject.workoutType;

      const matchesSearchTerm = data.name.toLowerCase().includes(searchTerm);
      const matchesWorkoutType =
        workoutType === 'all' ||
        data.workouts.some(
          workout => workout.type?.toLowerCase() === workoutType.toLowerCase()
        );

      return matchesSearchTerm && matchesWorkoutType;
    };
  }
}

export { User };
