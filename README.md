# Firebase Fake Chat
This demo project is a web-based application of a chat using Firebase to store messages and to make them appear in real-time on the screen.

## Requirements
To run the app you just need __git__ and [Node](https://nodejs.org/en/).  
Technologies used in this demo are HTML, SCSS and TypeScript. If you are not familiar with it, TypeScript code looks very similar to JavaScript ES6. There are comments to make it as easy as possible.

## How to run it

#### 1. Clone this repo and install NPM dependencies
```bash
git clone https://github.com/codelittinc/firebase-fake-chat
cd firebase-fake-chat
npm install
```

#### 2. Create a Firebase project
Using your Codelitt Google account, go to the [Firebase Console](https://console.firebase.google.com).  
Click on __Add project__ and follow the steps described. When it finishes, you should land on your project's dashboard.  

#### 3. Add Firebase to your web project
Here you can choose to add an iOS/Android/Web app. Click on the "</>" icon to choose to add a web app and copy the config object shown in the popup.  
Open the project's folder in your favorite code editor and paste the config in __src/config.ts__

#### 4. Start the app
We're ready to go! Use the following command to start a local development server running this app:
```bash
npm run dev
```

Go to __http://localhost:8080/__ to see it.

## FAQ

#### Why "fake" chat?
Because this is just a Proof of Concept. A real chat would probably have authentication, rooms and other features.

#### What Firebase features are being used in this demo?
This demo is only using the Cloud Firestore database.

#### Show me the code!
All the logic for the chat is in __src/index.ts__. The `initialize` method starts the party.  
You can jump on the interesting parts, where we use the Firestore APIs:
- In the method `readMessages` we listen for changes in the _chat_ collection.
- In the method `sendMessage` we push a `ChatMessage` object to the _chat_ collection.

#### How to build the app?
Run `npm run build`. It generates a __dist__ folder, containing all the app files. You could upload the content of that directory to your project's Hosting using the [Firebase CLI](https://firebase.google.com/docs/cli/). 

#### My app is not web-based. Can I use Firebase anyway?
Yes. Firebase has SDKs for many different languages. Feel free to choose your favourite one. Please note that not all its features are available for all the technologies.

## Useful readings
Check out the Firebase [official documentation](https://firebase.google.com/docs/)
