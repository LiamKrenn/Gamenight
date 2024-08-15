<script lang="ts">
  import { onMount } from 'svelte';
  import ChatClient from 'chat-client-delta';

  type AudioData = any; 
  type ChatMessage = { message: string };
  type MatchChatData = { match_chat_id: string };
  type NotificationChatIds = any;
  type StartFriendChatResult = { chatId: string; oldMessages: ChatMessage[] };

  const ServerIP: string = "172.205.243.31";
  const Port: number = 8081;
  const UserID: string = "1";

  let chatClient: ChatClient;
  let messageInput: string = '';
  let friendUserId: string = '';
  let messages: ChatMessage[] = [];
  let audioIsPlaying: boolean = false;
  let current_match_chat_id: string | null = null;

  onMount(() => {
    chatClient = new ChatClient(ServerIP, Port, UserID);

    chatClient.connect()
      .then(() => {
        //console.log('Chat client connected');

        chatClient.setOnAudioMessageReceived((audioData: AudioData) => {
          //console.log('Audio data received:', audioData);
        });

        chatClient.setOnChatMessageReceived((data: { message: string }) => {
          //console.log("New message received:", data);
          messages = [...messages, { message: data.message }];
        });

        chatClient.setOnMatchChat((data: MatchChatData) => {
          //console.log("Match chat event triggered with user IDs:", data.match_chat_id);
          current_match_chat_id = data.match_chat_id;
        });

        chatClient.setNotificationChatIds((data: NotificationChatIds) => {
          //console.log("New notification received:", data);
        });
      })
      .catch(err => {
        console.error('Failed to connect chat client:', err);
      });
  });

  function startAudioCapture(): void {
    if (current_match_chat_id) {
      chatClient.startAudioCapture(current_match_chat_id);
    }
  }

  function stopAudioCapture(): void {
    chatClient.stopAudioCapture();
  }

  function activateAudio(): void {
    if (!audioIsPlaying) {
      chatClient.stop_playing = false;
      chatClient.playAudioQueue();
      audioIsPlaying = true;
    } else {
      chatClient.stop_playing = true;
      audioIsPlaying = false;
    }
  }

  async function startChat(): Promise<void> {
    if (friendUserId) {
      try {
        const { chatId, oldMessages }: StartFriendChatResult = await chatClient.startFriendChat(friendUserId);
        console.log(`Friend chat ID: ${chatId}`);
        console.log("Old messages:", oldMessages);
      } catch (err) {
        console.error('Failed to start friend chat:', err);
      }
    } else {
      alert('Please enter a friend user ID.');
    }
  }

  function sendMessage(): void {
    if (messageInput && friendUserId) {
      chatClient.startFriendChat(friendUserId)
        .then(({ chatId }: { chatId: string }) => {
          chatClient.sendFriendMessage(chatId, messageInput);
        })
        .catch(err => {
          console.error('Failed to send message:', err);
        });
    } else {
      alert('Please enter a message and friend user ID.');
    }
  }
</script>

<svelte:head>
  <title>Chat</title>
</svelte:head>

<main>
  <h1>Audio Capture Control</h1>
  <button on:click={startAudioCapture}>Start Audio Capture</button>
  <button on:click={stopAudioCapture}>Stop Audio Capture</button>
  <button on:click={activateAudio}>{audioIsPlaying ? 'Deactivate Audio' : 'Activate Audio'}</button>

  <hr>

  <h2>Chat Control</h2>
  <input type="text" bind:value={friendUserId} placeholder="Friend User ID">
  <button on:click={startChat}>Start Chat</button>

  <div>
    <input type="text" bind:value={messageInput} placeholder="Enter message">
    <button on:click={sendMessage}>Send Message</button>
  </div>

  <div id="messages">
    <h3>Received Messages:</h3>
    <ul>
      {#each messages as message}
        <li>{message}</li>
      {/each}
    </ul>
  </div>
</main>

<style>
  main {
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: #333;
  }

  button {
    margin-right: 0.5rem;
  }

  input {
    margin-right: 0.5rem;
  }
</style>
