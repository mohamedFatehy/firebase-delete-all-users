## Delete All Users In Firebase Auth

#### Follow the steps

##### (1) To generate a private key file for your service account:

- In the Firebase console, open Settings > Service Accounts.

- Click Generate New Private Key, then confirm by clicking Generate Key.

- Securely store the JSON file containing the key.

- see (https://firebase.google.com/docs/admin/setup)


##### (2) Replace the path of the file you just downloaded from the previous step in the index.Js file ([/path/to/cert/file.json])


##### (3) replace the project-Id in index.Js file ([Firebase-Project-Id])

##### (4) run the below command to delete project dependencies
```
 npm install
```

##### (5) run the below command that will delete all the users with bulk delete every loop with 1000 user to delete
```
 node index.js
```