import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { FunctionalityForm } from 'src/app/models/form.model';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { MetaData } from 'src/app/models/meta.model';
import { User } from 'src/app/models/user.model';

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
    private apiService: UserApiService,
    private router: Router
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
}
