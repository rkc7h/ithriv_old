import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { ErrorMatcher } from '../error-matcher';
import { FormField } from '../form-field';
import { Resource } from '../resource';
import { ResourceApiService } from '../shared/resource-api/resource-api.service';
import { ValidateUrl } from '../shared/validators/url.validator';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  category: Category;
  createNew = false;
  error: string;
  errorMatcher = new ErrorMatcher();
  isDataLoaded = false;
  resource: Resource;
  resourceForm: FormGroup;
  showConfirmDelete = false;

  // Form Fields
  fields = {
    name: new FormField({
      formControl: new FormControl(),
      required: true,
      maxLength: 140,
      minLength: 1,
      placeholder: 'Name',
      type: 'text'
    }),
    description: new FormField({
      formControl: new FormControl(),
      required: true,
      maxLength: 600,
      minLength: 20,
      placeholder: 'Description',
      type: 'textarea',
      options: {
        hideIcons: ['heading', 'image', 'side-by-side', 'fullscreen'],
        status: ['words'],
      }
    }),
    owner: new FormField({
      formControl: new FormControl(),
      required: true,
      maxLength: 100,
      minLength: 1,
      placeholder: 'Owner',
      type: 'text'
    }),
    website: new FormField({
      formControl: new FormControl(),
      required: true,
      maxLength: 100,
      minLength: 7,
      placeholder: 'Website',
      type: 'url'
    }),
  };

  constructor(
    private api: ResourceApiService,
    public dialogRef: MatDialogRef<ResourceFormComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {
    this.loadData();

    if (this.dialogRef) {
      const colWidth = 100 - (1 / 6);
      this.dialogRef.updateSize(`${colWidth}vw`);
    }

    this.loadForm();
  }

  ngOnInit() {
    if (!this.createNew) {
      this.validate();
    }
  }

  loadData() {
    // If editing resource in a dialog, load data from dialogData
    if (this.dialogData) {
      this.loadDataFromDialog();
    } else {
      this.loadDataFromAPI();
    }
  }

  loadDataFromDialog() {
    if (this.dialogData.edit) {
      this.createNew = false;
      this.resource = this.dialogData.edit;
      this.isDataLoaded = true;
    } else {
      this.createNew = true;
      this.resource = { id: null, name: '', description: '' };
      this.isDataLoaded = true;
    }

    if (this.dialogData.parent_category) {
      this.category = this.dialogData.parent_category;
    }
  }

  loadDataFromAPI() {
    this.route.params.subscribe(params => {
      const resourceId = params['resource'];
      const categoryId = params['category'];

      if (resourceId) {
        this.api
          .getResource(resourceId)
          .subscribe((r) => {
            this.createNew = false;
            this.resource = r;
            this.isDataLoaded = true;
          });
      } else {
        this.createNew = true;
        this.resource = { id: null, name: '', description: '' };
        this.isDataLoaded = true;
      }

      if (categoryId) {
        this.api
          .getCategory(categoryId)
          .subscribe((c) => this.category = c);
      }
    });
  }

  loadForm() {
    const formGroup = {};
    for (const fieldName in this.fields) {
      if (this.fields.hasOwnProperty(fieldName)) {
        const field = this.fields[fieldName];

        const validators = [];

        if (field.required) {
          validators.push(Validators.required);
        }

        if (field.minLength) {
          validators.push(Validators.minLength(field.minLength));
        }

        if (field.maxLength) {
          validators.push(Validators.maxLength(field.maxLength));
        }

        if (field.type === 'email') {
          validators.push(Validators.email);
        }

        if (field.type === 'url') {
          validators.push(ValidateUrl);
        }

        field.formControl.patchValue(this.resource[fieldName]);
        // this[fieldName].valueChanges.subscribe(t => this.resource[fieldName] = t);
        field.formControl.setValidators(validators);
        formGroup[fieldName] = field.formControl;
      }
    }

    this.resourceForm = new FormGroup(formGroup);
    this.isDataLoaded = true;
  }

  onSubmit() {
    this.validate();

    if (this.resourceForm.valid) {
      this.isDataLoaded = false;

      for (const fieldName in this.fields) {
        if (this.fields.hasOwnProperty(fieldName)) {
          this.resource[fieldName] = this.fields[fieldName].formControl.value;
        }
      }

      if (this.createNew) {
        this.api.addResource(this.resource).subscribe(r => {
          this.resource = r;
          if (this.dialogData.parent_category) {
            this.api.linkResourceAndCategory(this.resource, this.category).subscribe();
          }

          this.close();
        });
      } else {
        this.api.updateResource(this.resource).subscribe(r => {
          this.resource = r;
          this.close();
        });
      }
    }
  }

  onCancel() {
    this.close();
  }

  validate() {
    for (const key in this.resourceForm.controls) {
      if (this.resourceForm.controls.hasOwnProperty(key)) {
        const control = this.resourceForm.controls[key];
        control.markAsTouched();
      }
    }
  }

  showDelete() {
    this.showConfirmDelete = true;
  }

  onDelete() {
    this.api.deleteResource(this.resource).subscribe(r => {
      this.close();
    },
      error => this.error = error
    );
  }

  close() {
    if (this.dialogRef) { this.dialogRef.close(); }
  }
}
