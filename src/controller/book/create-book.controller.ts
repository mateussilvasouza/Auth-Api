import { Request, Response } from "express";
import { books } from "../../model/book.model";
import { randomUUID } from "crypto";
import { RoleType } from "../../model/user.model";

export interface CreateBookProps{
  title: string;
  author: string;
  year: number;
  publisher: string;
}
export const createBook = (req: Request<{},{},CreateBookProps>, res: Response): void => {
  const userId = req.user?.sub as string

  const {title,author,publisher,year} = req.body

  const bookAlreadyExists = books.some(book => 
    book.title === title && 
    book.author === author && 
    book.publisher === publisher && 
    book.year === year
  );
  
  if (bookAlreadyExists) {
    res.status(400).json({ message: 'Book already exists' });
    return
  }
  
  // Adicionar o novo livro, caso não exista
  books.push({
    id: randomUUID(),
    title, 
    author, 
    publisher, 
    year, 
    registerBy: userId 
  });

  res.status(201).json({ message: 'Book created successfully' });
}