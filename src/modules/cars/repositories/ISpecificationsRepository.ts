import { Specification } from "../model/Specification";


interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  list(): Specification[];
  specificationByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO }