const initState = {lists: [], createdAt: '', following: []}

const profile = (state = initState, action) => {
    switch (action.type) {
        case 'fetch-profile':
            return action.profile;
        case 'update-profile':
            return action.profile;
        case 'destroy-profile':
            return initState;
        case 'click-edit':
            return {
                ...state,
                edit: true
            }
        case 'click-cancel':
            return {
                ...state,
                edit: false
            }
        case 'click-save':
            return {
                ...action.profile,
                edit: false
            }
        default:
            return state
    }
}
export default profile;