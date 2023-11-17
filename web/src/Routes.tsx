// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Books" titleTo="books" buttonLabel="New Book" buttonTo="newBook">
        <Route path="/books/new" page={BookNewBookPage} name="newBook" />
        <Route path="/books/{id:Int}/edit" page={BookEditBookPage} name="editBook" />
        <Route path="/books/{id:Int}" page={BookBookPage} name="book" />
        <Route path="/books" page={BookBooksPage} name="books" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Publishers" titleTo="publishers" buttonLabel="New Publisher" buttonTo="newPublisher">
        <Route path="/publishers/new" page={PublisherNewPublisherPage} name="newPublisher" />
        <Route path="/publishers/{id:Int}/edit" page={PublisherEditPublisherPage} name="editPublisher" />
        <Route path="/publishers/{id:Int}" page={PublisherPublisherPage} name="publisher" />
        <Route path="/publishers" page={PublisherPublishersPage} name="publishers" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Authors" titleTo="authors" buttonLabel="New Author" buttonTo="newAuthor">
        <Route path="/authors/new" page={AuthorNewAuthorPage} name="newAuthor" />
        <Route path="/authors/{id:Int}/edit" page={AuthorEditAuthorPage} name="editAuthor" />
        <Route path="/authors/{id:Int}" page={AuthorAuthorPage} name="author" />
        <Route path="/authors" page={AuthorAuthorsPage} name="authors" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
