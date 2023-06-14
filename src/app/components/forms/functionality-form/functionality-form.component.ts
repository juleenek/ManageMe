import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { FunctionalityForm } from 'src/app/models/form.model';
import { UserApiService } from 'src/app/services/user-api.service';
import { User } from 'src/app/models/user.model';
import { Functionality } from 'src/app/models/functionality.model';
import { generateId } from 'src/app/utils/generators';
import { Status } from 'src/app/models/enums/status.enum';

@Component({
  selector: 'app-functionality-form',
  templateUrl: './functionality-form.component.html',
  styleUrls: ['./functionality-form.component.scss'],
})
export class FunctionalityFormComponent {
  functionality!: FormGroup<FunctionalityForm>;
  currentUserId: any;
  currentUser: User = {} as User;

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.functionality = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
    });
    this.getCurrentUser();
  }

  @Output() formActiveChangeEvent = new EventEmitter<boolean>();

  changeIsFormActive(isActive: boolean) {
    this.formActiveChangeEvent.emit(isActive);
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

  onSubmit(): void {
    const functionality: Functionality = {
      id: generateId(),
      ...this.functionality.value,
      status: Status.TODO,
      createdAt: Date.now(),
    } as Functionality;

    this.currentUser.functionalities.push(functionality);
    this.apiService
      .updateFunctionalities(this.currentUser.id, this.currentUser)
      .subscribe();

    this.changeIsFormActive(false);
  }
}
