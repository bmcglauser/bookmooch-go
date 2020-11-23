export interface User {
  display_name: string;
  username: string;
  points: string;
  listings?: Listing[];
  listingCount: number;
  feedback_score: string;
  pending_give?: Transaction[];
  pending_receive?: Transaction[];
  country?: string;
  willsend?: string;
}

export interface Listing {
  asin: string;
  book: Book;
  listed_on: string;
  condition: string;
}

export interface Book {
  asin?: string;
  title: string;
  author: string;
  cover_art_url: string;
  summary?: string;
  availCount?: string;
  usernamesWith?: string[];
}

export interface Transaction {
  transaction_name: string;
  asin: string;
  book: Book;
  status: string;
  created_on: string;
  receiverUsername?: string;
  giverUsername?: string;
}