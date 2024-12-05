export interface IBook{
  id: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
  registerBy: string;
}

export const books: IBook[] = []