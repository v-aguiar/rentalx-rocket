import { Router } from 'express'
import { CategoriesRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const validateCategoryByName = categoriesRepository.categoryByName(name)

  if (validateCategoryByName) { return response.status(401).json({ error: "Category already exists!" }) }

  categoriesRepository.create({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const categoriesList = categoriesRepository.list()

  return response.status(200).json({ categoriesList })
})

export { categoriesRoutes }