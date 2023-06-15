import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/models/enums/status.enum';
import { TaskForm } from 'src/app/models/form.model';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';
import { generateId } from 'src/app/utils/generators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  task!: FormGroup<TaskForm>;
  currentUser: User = {} as User;

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.task = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
    });

    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.apiService.getMetaUser().subscribe((response) => {
      this.apiService
        .getUserById(response.currentUser.id)
        .subscribe((response) => {
          this.currentUser = response;
        });
    });
  }

  closeTaskForm() {
    this.closeTaskFormEvent.emit(false);
  }

  onSubmit() {
    const task: Task = {
      id: generateId(),
      ...this.task.value,
      status: Status.TODO,
      createdAt: Date.now(),
    } as Task;

    const updatedFunctionality = { ...this.functionality }; 
    updatedFunctionality.tasks.push(task); 

    this.currentUser.functionalities = this.currentUser.functionalities.map(
      (func) => {
        if (func.id === this.functionality.id) {
          return updatedFunctionality; 
        }
        return func;
      }
    );

    this.apiService
      .updateFunctionalities(this.currentUser.id, this.currentUser)
      .subscribe();

    this.closeTaskFormEvent.emit(false);
  }

  @Output() closeTaskFormEvent = new EventEmitter<boolean>();
  @Input() functionality = {} as Functionality;
}
