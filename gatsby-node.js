const crypto = require("crypto");

const admin = require("firebase-admin");

exports.sourceNodes = async ({
  actions: {
    createNode
  },
  createNodeId
}, {
  paths,
  credential
}) => {
  admin.initializeApp({
    credential: admin.credential.cert(credential),
    timestampsInSnapshots: true
  });
  var db = admin.firestore();
  const promises = paths.map(async path => {
    var docs = await db.collection(path).get();
    docs.forEach(doc => {
      createNode({
        data: doc.data(),
        id: createNodeId(`${path}-${doc.id}`),
        parent: null,
        children: [],
        internal: {
          type: path,
          content: JSON.stringify(doc.data()),
          contentDigest: crypto.createHash("md5").update(JSON.stringify(doc.data())).digest("hex")
        }
      });
    });
  });
  await Promise.all(promises);
  return;
};