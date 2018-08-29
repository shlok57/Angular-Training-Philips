import { Component, OnInit } from '@angular/core';
import { Ibook } from '../ibook';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pageTitle = 'Collection';
  books: Array<Ibook>;
  showOperatingHours: boolean;
  openingTime: Date;
  closingTime: Date;
  searchTerm$ = new Subject<string>();

  constructor(private _snackBar: MatSnackBar, private _dataService: DataService) {
    this.openingTime = new Date();
    this.openingTime.setHours(10, 0);
    this.closingTime = new Date();
    this.openingTime.setHours(15, 0);
  }

  ngOnInit() {
    this.getBooks();
    this._dataService.search(this.searchTerm$).subscribe(books => { this.books = books; });
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

  getBooks(): void {
    this._dataService.getBooks().subscribe(books => this.books = books, error => this.updateMessage(<any>error, 'ERROR'));
  }
}
