import { get } from "svelte/store";
import { chatClient, current_match_chat_id } from "./stores";

export type AudioData = any; 
export type ChatMessage = { message: string };
export type MatchChatData = { match_chat_id: string };
export type NotificationChatIds = any;
export type StartFriendChatResult = { chatId: string; oldMessages: ChatMessage[] };

function startAudioCapture(): void {
  // if (current_match_chat_id) {
  //   chatClient.startAudioCapture(current_match_chat_id);
  // }
}

function stopAudioCapture(): void {
  // chatClient.stopAudioCapture();
}

function activateAudio(): void {
  // if (!audioIsPlaying) {
  //   chatClient.stop_playing = false;
  //   chatClient.playAudioQueue();
  //   audioIsPlaying = true;
  // } else {
  //   chatClient.stop_playing = true;
  //   audioIsPlaying = false;
  // }
}

export async function startChat(friendUserId: string): Promise<void | ChatMessage[]> {
  try {
    const { chatId, oldMessages }: StartFriendChatResult = await get(chatClient).startFriendChat(friendUserId);
    console.log(`Friend chat ID: ${chatId}`);
    console.log("Old messages:", oldMessages);
    return oldMessages;
  } catch (err) {
    console.error('Failed to start friend chat:', err);
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
