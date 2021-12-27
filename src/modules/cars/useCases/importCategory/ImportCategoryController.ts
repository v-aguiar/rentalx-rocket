import { Request, Response } from 'express';

import { ImportCategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

  handle(request: Request, response: Response): Response {
    const { file } = request;

    /** 
     * O argumento do tipo 'File | undefined' não é atribuível ao parâmetro do tipo 'File'.
     * O tipo 'undefined' não pode ser atribuído ao tipo 'File'.ts(2345) 
    **/
    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };