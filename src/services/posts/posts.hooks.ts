import * as feathersAuthentication from "@feathersjs/authentication";
import includePostUserRelationship from "../../hooks/include-post-user-relationship";
import includeCommentsInPosts from "../../hooks/include-comments-in-posts";
import addCommentCountToPost from "../../hooks/add-comment-count-to-post";
import createUserLikeMapping from "../../hooks/create-user-like-mapping";
import getPostsLikedByUser from "../../hooks/get-posts-liked-by-user";
import checkLikedOrDisliked from '../../hooks/check-liked-or-disliked';
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [includePostUserRelationship()],
    get: [includePostUserRelationship(), includeCommentsInPosts()],
    create: [],
    update: [],
    patch: [checkLikedOrDisliked()],
    remove: [],
  },

  after: {
    all: [],
    find: [getPostsLikedByUser()],
    get: [addCommentCountToPost()],
    create: [],
    update: [],
    patch: [createUserLikeMapping()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
