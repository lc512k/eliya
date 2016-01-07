import dispatcher from './dispatcher';
 
export default class Actions {
    static navigate(newRoute) {
    	debugger
        dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }
}