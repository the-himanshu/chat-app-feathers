import assert from 'assert';
import app from '../../src/app';

describe('\'friends\' service', () => {
  it('registered the service', () => {
    const service = app.service('friends');

    assert.ok(service, 'Registered the service');
  });
});
