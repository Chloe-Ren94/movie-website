const profile = (state = {lists: [], createdAt: ''}, action) => {
    switch (action.type) {
        case 'fetch-profile':
            return action.profile;
        case 'update-profile':
            return action.profile;
        case 'destroy-profile':
            return {lists: [], createdAt: ''};
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