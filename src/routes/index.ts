import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger.json';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export { router };
