import * as authentication from '@feathersjs/authentication';
import increaseFriendsCount from '../../hooks/increase-friends-count';
import addFriendToFriendList from '../../hooks/add-friend-to-friend-list';
import checkPatchOperationType from '../../hooks/check-patch-operation-type';
import addDataToPendingRequests from '../../hooks/add-data-to-pending-requests';
import removeDataFromPendingRequests from '../../hooks/remove-data-from-pending-requests';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [increaseFriendsCount()],
    update: [],
    patch: [checkPatchOperationType()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addDataToPendingRequests()],
    update: [],
    patch: [addFriendToFriendList(), removeDataFromPendingRequests()],
    remove: [removeDataFromPendingRequests()]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
