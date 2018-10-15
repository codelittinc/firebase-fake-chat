import { firebaseConfig } from './config';
import * as firebase from 'firebase';
import { KeyCode } from './enums/key-code.enum';
import { ChatMessage } from './interfaces/chat-message.interface';
import { formatTimestamp } from './common/utils';
import './index.scss';

class App {

  private currentUser: string;
  private db: firebase.firestore.Firestore;

  initialize() {

    try {

      // initialize firebase app and db
      firebase.initializeApp(firebaseConfig);

      this.db = firebase.firestore();

      // disable firestore deprecated features
      this.db.settings({
        timestampsInSnapshots: true
      });

      // listen for chat messages
      this.readMessages();

    } catch (e) {

      alert("Firebase initialization failed. Please add your Firebase credentials in config.ts");
      console.error(e);

    }

    // set listeners for "login as" buttons
    document.querySelectorAll('button[data-login-as]').forEach(button => {
      button.addEventListener('click', () => {

        // set clicked user as logged in
        this.currentUser = button.getAttribute('data-login-as');
        document.querySelector('span.current-user').textContent = `Logged in as ${this.currentUser}`;

        // set focus on the message textarea
        document.getElementById('message').focus();

      });
    });

    // define behavior for message textarea
    const messageEl = document.getElementById('message') as HTMLTextAreaElement;

    // hit Enter to send message
    messageEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.which === KeyCode.Enter || e.keyCode === KeyCode.Enter) && messageEl.value.trim() !== '') {

        // prevent writing newline on the textarea
        e.preventDefault();

        // send the message (concat into a string to avoid passing the reference)
        this.sendMessage(`${messageEl.value}`);

        // clear the textarea
        messageEl.value = '';

      }
    });

  }

  private readMessages(): void {

    // this gets called every time a message is pushed in the chat collection
    this.db.collection('chat').orderBy('timestamp', 'asc').onSnapshot(snapshot => {

      // clear all chat messages in the DOM
      document.querySelectorAll('.chat-message').forEach(chatMessageEl => {
        chatMessageEl.parentNode.removeChild(chatMessageEl);
      });

      // add the new list of messages
      snapshot.forEach((doc) => {

        const data: ChatMessage = {
          id: doc.id,
          ...doc.data() as ChatMessage
        };

        this.renderMessage(data);

      });
    });

  }

  private renderMessage(chatMessage: ChatMessage): void {

    // get DOM element of the chat message and append it to the list of messages
    const messageEl = this.getTemplateWithData(chatMessage);

    const messagesContainerEl = document.querySelector('.chat__messages');
    messagesContainerEl.appendChild(messageEl);

    // scroll down to the last message
    messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;

  }

  private sendMessage(message: string): void {

    const data: ChatMessage = {
      message,
      user: this.currentUser || 'anonymous',
      timestamp: Date.now()
    };

    // add the object above to the chat collection
    // note: if the "chat" collection does not exists, it gets created here
    this.db.collection('chat').add(data);

  }

  private getTemplateWithData(chatMessage: ChatMessage): HTMLElement {

    // get template of the message and create a copy of it
    const template = document.getElementById('chat-message-template') as HTMLTemplateElement;
    const clone = template.content.cloneNode(true) as HTMLElement;

    // add data to the copied template
    clone.querySelector('.chat-message').setAttribute('data-message-id', chatMessage.id);
    clone.querySelector('.chat-message__user').textContent = chatMessage.user;
    clone.querySelector('.chat-message__message').textContent = chatMessage.message;
    clone.querySelector('.chat-message__timestamp').textContent = formatTimestamp(chatMessage.timestamp);

    return clone;

  }

}

const app = new App();
app.initialize();
