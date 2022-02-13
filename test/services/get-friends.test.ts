import assert from 'assert';
import app from '../../src/app';

describe('\'get-friends\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-friends');

    assert.ok(service, 'Registered the service');
  });
});
