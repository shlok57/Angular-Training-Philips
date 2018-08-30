import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import { RatingCategoryPipe } from '../pipes/rating-category.pipe';
import { RatingComponent } from '../rating/rating.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { NewBookComponent } from '../new-book/new-book.component';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookGuardService } from '../guards/book-guard.service';
import {
  MatListModule,
  MatTabsModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatLineModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatLineModule,
    MatInputModule,
    MatToolbarModule
  ],
  entryComponents: [
    NewBookComponent
  ],
  declarations: [
    CollectionComponent,
    RatingComponent,
    BookDetailComponent,
    NewBookComponent,
    RatingCategoryPipe
  ],
  providers: [
    BookGuardService,
    DataService
  ]
})
export class CollectionModule { }
