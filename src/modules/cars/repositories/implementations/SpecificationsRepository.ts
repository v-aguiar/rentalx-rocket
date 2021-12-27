import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";
import { Specification } from "../../model/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository;
    }
    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specifications.push(specification);
  }

  list() {
    return this.specifications;
  }

  specificationByName(name: string): Specification {
    const specification = this.specifications.find(specification => specification.name === name);

    if (!specification) {
      console.log('Specification doesn`t exists!')
    }

    return specification as Specification
  }
}

export { SpecificationsRepository }