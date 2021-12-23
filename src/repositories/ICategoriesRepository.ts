import { Category } from '../model/Category'

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  categoryByName(name: string): Category;
  create({ name, description }: ICreateCategoryDTO): void;
  list(): Category[]
}

export { ICategoriesRepository, ICreateCategoryDTO }