FIreStorgae Rules:
rules_version = '2';
service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=\*\*} {
match /profileImages/{imageId} {
allow read, write: if request.auth != null;
}
allow read, write: if
request.time < timestamp.date(2023, 4, 21);
}
}
}
