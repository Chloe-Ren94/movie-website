const profile = (state = {lists: []}, action) => {
    switch (action.type) {
        case 'fetch-profile':
            return action.profile;
        case 'update-profile':
            return action.profile;
        case 'destroy-profile':
            return {lists: []};
        // case 'click-edit':
        //     return {
        //         ...state,
        //         edit: true
        //     }
        // case 'click-save':
        //     return {
        //         ...action.profile,
        //         edit: false
        //     }
        // case 'click-cancel':
        //     return {
        //         ...state,
        //         edit: false
        //     }
        default:
            return state
    }
}
export default profile;