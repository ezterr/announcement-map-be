import { NextFunction, Request, Response } from 'express';
import { CategoryRepository } from '../repository/category.repository';

export class CategoryController {
  public static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryRepository.findAll();

      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
}
