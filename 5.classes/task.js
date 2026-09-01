'use strict';

class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find((book) => book[type] === value) || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex(
      (book) => book.name === bookName
    );

    if (bookIndex === -1) {
      return null;
    }

    return this.books.splice(bookIndex, 1)[0];
  }
}

// Тестовый сценарий

const library = new Library('Библиотека имени Ленина');

library.addBook(
  new NovelBook(
    'Герберт Уэллс',
    'Машина времени',
    1895,
    138
  )
);

library.addBook(
  new FantasticBook(
    'Аркадий и Борис Стругацкие',
    'Пикник на обочине',
    1972,
    168
  )
);

library.addBook(
  new DetectiveBook(
    'Артур Конан Дойл',
    'Приключения Шерлока Холмса',
    1892,
    400
  )
);

library.addBook(
  new Magazine(
    'Мурзилка',
    1924,
    60
  )
);

// Ищем издание 1919 года
let book1919 = library.findBookBy('releaseDate', 1919);

// Если издание не найдено, создаём книгу 1919 года
if (book1919 === null) {
  book1919 = new NovelBook(
    'Сомерсет Моэм',
    'Луна и грош',
    1919,
    240
  );

  library.addBook(book1919);
}

// Выдаём книгу
const issuedBook = library.giveBookByName(book1919.name);

console.log('Выданная книга:', issuedBook);
console.log('Количество книг после выдачи:', library.books.length);

// Повреждаем книгу
issuedBook.state = 40;
console.log('Состояние после повреждения:', issuedBook.state);

// Восстанавливаем книгу
issuedBook.fix();
console.log('Состояние после восстановления:', issuedBook.state);

// Пытаемся вернуть книгу в библиотеку
library.addBook(issuedBook);

console.log('Количество книг после возврата:', library.books.length);