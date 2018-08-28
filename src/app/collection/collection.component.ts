import { Component, OnInit } from '@angular/core';
import { Ibook } from '../ibook';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pageTitle = 'Collection';
  books: Array<Ibook>;
  showOperatingHours: boolean;
  openingTime: Date;
  closingTime: Date;

  constructor(private _snackBar: MatSnackBar, private _dataService: DataService) {
    this.openingTime = new Date();
    this.openingTime.setHours(10, 0);
    this.closingTime = new Date();
    this.openingTime.setHours(15, 0);
  }

  ngOnInit() {
    this.books = this._dataService.getBooks();
  }

  updateMessage(message: string, type: string) {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
        duration: 3000
      });
    }
  }

  onRatingUpdated(book: Ibook): void {
    this.updateMessage(book.title, ' Rating has been updated');
  }
}
