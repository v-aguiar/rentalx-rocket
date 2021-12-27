import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }