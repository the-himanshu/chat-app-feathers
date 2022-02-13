import assert from 'assert';
import app from '../../src/app';

describe('\'get-friends-and-requests-data\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-friends-and-requests-data');

    assert.ok(service, 'Registered the service');
  });
});
