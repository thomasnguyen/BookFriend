import { TestBed } from '@angular/core/testing';

import { BookShelfService } from './bookshelf.service';

describe('BookshelfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookShelfService = TestBed.get(BookShelfService);
    expect(service).toBeTruthy();
  });
});
