import assert from 'assert';
import app from '../../src/app';

describe('\'user-likes-mapping\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-likes-mapping');

    assert.ok(service, 'Registered the service');
  });
});
