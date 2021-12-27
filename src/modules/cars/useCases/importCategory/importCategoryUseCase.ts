import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const { name, description } = line;

          categories.push({
            name,
            description
          });

          categories.map((category) => {
            const categoryAlreadyExists = this.categoriesRepository.categoryByName(category.name);

            if (!categoryAlreadyExists) {
              this.categoriesRepository.create({ name, description });
            }
          });
        })
        .on("end", () => {
          resolve(categories);
        });




    })
  }

  execute(file: Express.Multer.File): void {

  }
}

export { ImportCategoryUseCase };