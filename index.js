const {getAuth} = require("firebase-admin/auth");

const admin = require("firebase-admin");

const serviceAccount = require("[/path/to/cert/file.json]");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://[Firebase-Project-Id].firebaseio.com"
});
defaultAuth = getAuth();


const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            let deletedUUIDs = [];
            listUsersResult.users.forEach((userRecord) => {
                if (typeof userRecord.uid === 'string') {
                    deletedUUIDs.push(userRecord.uid)
                }
            });
            bulkDeleteUsers(deletedUUIDs)
            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);
            }
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

const bulkDeleteUsers = (deletedUsers) => {
    getAuth()
        .deleteUsers(deletedUsers)
        .then((deleteUsersResult) => {
            console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
            console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
            deleteUsersResult.errors.forEach((err) => {
                console.log(err.error.toJSON());
            });
        })
        .catch((error) => {
            console.log('Error deleting users:', error);
        });
}