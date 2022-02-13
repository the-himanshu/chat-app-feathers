import { Application } from '../declarations';
import users from './users/users.service';
import posts from './posts/posts.service';
import comments from './comments/comments.service';
import userLikesMapping from './user-likes-mapping/user-likes-mapping.service';
import getFriends from './get-friends/get-friends.service';
import friends from './friends/friends.service';
import getFriendsAndRequestsData from './get-friends-and-requests-data/get-friends-and-requests-data.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(posts);
  app.configure(comments);
  app.configure(userLikesMapping);
  app.configure(getFriends);
  app.configure(friends);
  app.configure(getFriendsAndRequestsData);
}
