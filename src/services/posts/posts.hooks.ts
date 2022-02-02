import * as feathersAuthentication from '@feathersjs/authentication';
import includePostUserRelationship from '../../hooks/include-post-user-relationship';
import includeCommentsInPosts from '../../hooks/include-comments-in-posts';
import addCommentCountToPost from '../../hooks/add-comment-count-to-post';
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includePostUserRelationship()],
    get: [includePostUserRelationship(), includeCommentsInPosts()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [addCommentCountToPost()],
    create: [],
    update: [],
    patch: [],
    remove: []
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
