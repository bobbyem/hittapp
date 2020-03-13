const functions = require('firebase-functions');
const gcs = require("@google-cloud/storage")();
const os = require("os");
const path = require("path");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(event => {
    // const bucket = event.bucket;
    // const contentType = event.contentType;
    // const filePath = event.name;
    // console.log("File change detected, fuction execution started.");

    // if (path.basename(filePath).startsWith("renamed-")) {
    //     console.log("We already renamed file");
    //     return;
    // }


    // const destBucket = gcs.bucket(bucket);
    // const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    // const metadata = { contentType: contentType };
    // return destBucket.file(filePath).download({
    //     destination: tmpFilePath 
    // }).then(() => {
    //     return destBucket.upload(tmpFilePath, {
    //         destination: "renamed-" + path.basename(filepath),
    //         metadata: metadata
    //     })
    // });
});
