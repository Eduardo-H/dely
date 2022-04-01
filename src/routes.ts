import { Router } from 'express';
import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController';

import { CreateClientController } from './modules/client/useCases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryMan/CreateDeliverymanController';

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();

routes.post('/client/authenticate', authenticateClientController.handle);

routes.post('/client', createClientController.handle);

routes.post('/deliveryman', createDeliverymanController.handle);

export { routes };