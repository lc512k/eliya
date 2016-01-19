import dispatcher from './dispatcher';
 
export default class Actions {
    static navigate(newRoute) {
        dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }
}