import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ibook } from '../ibook';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [DataService]
})

export class BookDetailComponent implements OnInit {

  bookId: number;
  book: Ibook;
  sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.bookId) {
      this.sub = this._route.params.subscribe(
        params => {
          const id: number = +params['id']; // bad way to convert into int from string
          this.getBook(id);
        });
      return;
    }
    this.getBook(this.bookId);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getBook(id: number): void {
    this._dataService.getBook(id).subscribe(
      book => this.book = book,
      error => this.updateMessage(<any>error, 'Error'));
  }


  onRatingUpdate(book: Ibook): void {
    this.updateBook(book);
  }

  updateMessage(message: string, type: string, actionText: string = 'DISMISS') {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, actionText, { duration: 3000 });
    }
  }

  return(): void {
    this._router.navigate(['/collection']);
  }

  updateBook(book: Ibook): void {
    this._dataService.updateBook(book)
      .subscribe(
        books => {
          this._snackBar.open(`"${book.title}" has been updated!`, 'DISMISS', { duration: 3000 });
        },
        error => this.updateMessage(<any>error, 'ERROR')
      );
  }

  previous(): void {
    this._dataService.getPreviousBookId(this.book.id).subscribe((bookId) => this._router.navigate(['/collection', bookId]));
  }

  next(): void {
    this._dataService.getNextBookId(this.book.id).subscribe((bookId) => this._router.navigate(['/collection', bookId]));
  }
}
