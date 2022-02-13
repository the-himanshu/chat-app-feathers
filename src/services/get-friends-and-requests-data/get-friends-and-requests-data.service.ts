// Initializes the `get-friends-and-requests-data` service on path `/get-friends-and-requests-data`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GetFriendsAndRequestsData } from './get-friends-and-requests-data.class';
import hooks from './get-friends-and-requests-data.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'get-friends-and-requests-data': GetFriendsAndRequestsData & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/get-friends-and-requests-data', new GetFriendsAndRequestsData(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('get-friends-and-requests-data');

  service.hooks(hooks);
}
