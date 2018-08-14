import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { InlineSVGModule } from 'ng-inline-svg';
import { ColorPickerModule } from 'ngx-color-picker';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarkdownModule } from 'ngx-markdown';
import { AddCategoryButtonComponent } from './add-category-button/add-category-button.component';
import { AddResourceButtonComponent } from './add-resource-button/add-resource-button.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { ApprovedBadgeComponent } from './approved-badge/approved-badge.component';
import { AuthInterceptor } from './AuthInterceptor';
import { AvailabilityComponent } from './availability/availability.component';
import { BrowseComponent } from './browse/browse.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryNetworkViewComponent } from './category-network-view/category-network-view.component';
import { CategoryTileComponent } from './category-tile/category-tile.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditCategoryButtonComponent } from './edit-category-button/edit-category-button.component';
import { EditResourceButtonComponent } from './edit-resource-button/edit-resource-button.component';
import { FavoriteResourceButtonComponent } from './favorite-resource-button/favorite-resource-button.component';
import { FavoriteResourceListComponent } from './favorite-resource-list/favorite-resource-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormFieldLabelComponent } from './form-field-label/form-field-label.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { GradientBackgroundDirective } from './gradient-background.directive';
import { GradientBorderDirective } from './gradient-border.directive';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceSearchComponent } from './resource-search/resource-search.component';
import { ResourceTileComponent } from './resource-tile/resource-tile.component';
import { ResourceComponent } from './resource/resource.component';
import { SearchComponent } from './search/search.component';
import { SessionRedirectComponent } from './session-redirect/session-redirect.component';
import { ResourceApiService } from './shared/resource-api/resource-api.service';
import { TreeSelectComponent } from './tree-select/tree-select.component';

@NgModule({
  declarations: [
    AddCategoryButtonComponent,
    AddResourceButtonComponent,
    AppComponent,
    ApprovedBadgeComponent,
    AvailabilityComponent,
    BrowseComponent,
    CategoryComponent,
    CategoryFormComponent,
    CategoryNetworkViewComponent,
    CategoryTileComponent,
    DashboardComponent,
    EditCategoryButtonComponent,
    EditResourceButtonComponent,
    FavoriteResourceButtonComponent,
    FavoriteResourceButtonComponent,
    FavoriteResourceListComponent,
    FavoriteResourceListComponent,
    ForgotPasswordComponent,
    FormFieldComponent,
    FormFieldLabelComponent,
    GradientBackgroundDirective,
    GradientBorderDirective,
    GradientBorderDirective,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    LogoComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterFormComponent,
    ResetPasswordComponent,
    ResourceComponent,
    ResourceFormComponent,
    ResourceListComponent,
    ResourceSearchComponent,
    ResourceTileComponent,
    SearchComponent,
    SessionRedirectComponent,
    TreeSelectComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ColorPickerModule,
    CommonModule,
    CovalentTextEditorModule,
    DeviceDetectorModule.forRoot(),
    FlexLayoutModule,
    HttpClientModule,
    InfiniteScrollModule,
    InlineSVGModule.forRoot(),
    MarkdownModule.forRoot(),
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CategoryFormComponent, ResourceFormComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ResourceApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
