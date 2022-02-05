// Initializes the `user-likes-mapping` service on path `/user-likes-mapping`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserLikesMapping } from './user-likes-mapping.class';
import createModel from '../../models/user-likes-mapping.model';
import hooks from './user-likes-mapping.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'user-likes-mapping': UserLikesMapping & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-likes-mapping', new UserLikesMapping(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-likes-mapping');

  service.hooks(hooks);
}
