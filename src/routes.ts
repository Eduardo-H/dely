import { Router } from 'express';
import { ensureAuthenticatedClient } from './middlewares/ensureAuthenticatedClient';
import { ensureAuthenticatedDeliveryman } from './middlewares/ensureAuthenticatedDeliveryman';

import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/client/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/delivery/useCases/createDelivery/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryMan/CreateDeliverymanController';
import { FindAllAvailableDeliveriesController } from './modules/delivery/useCases/findAllAvailableDeliveries/FindAllAvailableDeliveriesController';
import { UpdateDeliverymanController } from './modules/delivery/useCases/updateDeliveryman/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/client/useCases/findAllDeliveries/FindAllDeliveriesController';
import { FindAllDeliverymanDeliveriesController } from './modules/deliveryman/useCases/findAllDeliverymanDeliveries/FindAllDeliverymanDeliveriesController';

const routes = Router();

// Controllers
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

const updateDeliverymanController = new UpdateDeliverymanController();

const findAllAvailableDeliveries = new FindAllAvailableDeliveriesController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliverymanDeliveries = new FindAllDeliverymanDeliveriesController();

// Routes
routes.post('/client/authenticate', authenticateClientController.handle);
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);

routes.post('/client', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);
routes.post('/delivery', ensureAuthenticatedClient, createDeliveryController.handle);

routes.put('/delivery/:id/deliveryman', ensureAuthenticatedDeliveryman, updateDeliverymanController.handle);

routes.get('/delivery/available', ensureAuthenticatedDeliveryman, findAllAvailableDeliveries.handle);
routes.get('/client/deliveries', ensureAuthenticatedClient, findAllDeliveriesClient.handle);
routes.get('/deliveryman/deliveries', ensureAuthenticatedDeliveryman, findAllDeliverymanDeliveries.handle);

export { routes };