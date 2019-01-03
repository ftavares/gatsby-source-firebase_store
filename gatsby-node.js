const crypto = require('crypto');
const admin = require('firebase-admin');

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId },
  { paths, credential }
) => {
  //   const apiUrl = `https://api.openweathermap.org/data/2.5/${options.type}?q=${options.location}&units=${options.units}&apikey=${options.apikey}`;
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();

  admin.initializeApp({
    credential: admin.credential.cert(credential),
    timestampsInSnapshots: true,
  });
  
  var db = admin.firestore();

  paths.forEach(async path => {
    var docs = await db.collection(path).get();

    docs.forEach(doc=>
        {

            createNode({
                data:doc.data(),
                id: createNodeId(`${path}-${doc.id}`),
                parent: null,
                children: [],
                internal: {
                  type: path,
                  content: JSON.stringify(doc.data()),
                  contentDigest: crypto
                    .createHash('md5')
                    .update(JSON.stringify(doc.data()))
                    .digest('hex'),
                },
              });

        })


  });
};
