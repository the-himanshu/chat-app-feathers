// Initializes the `get-friends` service on path `/get-friends`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GetFriends } from './get-friends.class';
import hooks from './get-friends.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'get-friends': GetFriends & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/get-friends', new GetFriends(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('get-friends');

  service.hooks(hooks);
}
