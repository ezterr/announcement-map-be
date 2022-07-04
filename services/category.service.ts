import { CategoryRepository } from '../repository/category.repository';

export class CategoryService {
  public static async getCategories() {
    return CategoryRepository.findAll();
  }
}
