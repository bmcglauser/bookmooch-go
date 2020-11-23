export interface User {
  display_name: string;
  username: string;
  points: string;
  listings?: Listing[];
  listingCount: number;
  feedback_score: string;
}

export interface Listing {
  asin: string;
  book: Book;
  listed_on: string;
  condition: string;
}

export interface Book {
  title: string;
  author: string;
  cover_art_url: string;
}