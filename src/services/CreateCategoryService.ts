﻿import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IRequest {
  name: string;
  description: string
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute({ name, description }: IRequest): void {
    const validateCategoryByName = this.categoriesRepository.categoryByName(name)

    if (validateCategoryByName) { throw new Error("Category already exists!") }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }