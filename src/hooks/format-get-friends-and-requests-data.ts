// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    let resultArrayFriends: any = []
    let resultArraySent: any = []
    let resultArrayReceived: any = []
    
    for(let element of context.result) {
      element = element.toJSON()
      if(element.status == 'pending' && element.source == context.params.query?.userId) {
        element.targetUser.requestId = element.id;
        resultArraySent.push(element.targetUser)
      }
      else if(element.status == 'pending' && element.target == context.params.query?.userId) {
        element.sourceUser.requestId = element.id;
        resultArrayReceived.push(element.sourceUser)
      }
      else if(element.status == 'confirmed' && element.source == context.params.query?.userId) {
        element.targetUser.requestId = element.id;
        resultArrayFriends.push(element.targetUser)
      }
      else if(element.status == 'confirmed' && element.target == context.params.query?.userId) {
        element.sourceUser.requestId = element.id;
        resultArrayFriends.push(element.sourceUser)
      }
    }
    context.result = {
      friendsDetails: resultArrayFriends,
      receivedRequestsDetails: resultArrayReceived,
      sentRequestsDetails: resultArraySent
    }
    return context;
  };
};
