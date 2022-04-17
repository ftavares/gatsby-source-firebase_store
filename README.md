# gatsby-source-firebase_store

This source plugin for Gatsby will make Firebase Store information available in GraphQL queries.

## Installation

```sh
# Install the plugin
yarn add gatsby-source-firebase_store
```

```sh
# Install the plugin yarn add gatsby-source-firebase_store yarn add gatsby-source-firebase_store yarn add gatsby-source-firebase_store yarn add gatsby-source-firebase_store

```

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-firebase_store`,
      options: {
        credential: require("./firebase-key.json"),
        paths: ["__pathForYouDocumentOnStorage__"]
      }
    }
  ]
};
```

You can get 'firebase-key.json' at [Firebase Console](https://console.firebase.google.com) - [help](https://stackoverflow.com/a/44965889)

[Google Firebase](https://firebase.google.com/)
