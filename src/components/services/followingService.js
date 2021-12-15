export const findInFollowing = (toBeFollowed, currentUser) => {
    for (const following of currentUser.following) {
        if (following.userID === toBeFollowed._id) {
            return true;
        }
    }
    return false;
}