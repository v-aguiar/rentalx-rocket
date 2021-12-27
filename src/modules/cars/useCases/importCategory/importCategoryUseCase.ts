import fs from 'fs';

import { parse } from 'csv-parse';

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, untrimedDescription] = line;

          const description = untrimedDescription.trim();

          categories.push({
            name,
            description
          });
        })
        .on("end", () => {
          return resolve(categories);
        })
        .on("error", (err: any) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File | any): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const categoryAlreadyExists = this.categoriesRepository.categoryByName(category.name);

      if (!categoryAlreadyExists) {
        const name = category.name
        const description = category.description

        this.categoriesRepository.create({ name, description })
      }
    })
  }
}

export { ImportCategoryUseCase };