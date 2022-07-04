import { CategoryEntity } from '../types';

export class CategoryRecord implements CategoryEntity {
  public id: string;
  public name: string;

  constructor(category: CategoryEntity) {
    this.id = category.id;
    this.name = category.name;
  }
}
