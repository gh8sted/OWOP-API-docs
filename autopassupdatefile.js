// ==UserScript==
// @name         GetCSPassword EZ
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @license      MIT
// @description  gets the cs password ig
// @author       gh8sted
// @match        *://ourworldofpixels.com/*
// @icon         https://www.google.com/s2/favicons?domain=ourworldofpixels.com
// @grant        none
// @namespace    none
// @updateURL    https://raw.githubusercontent.com/gh8sted/OWOP-API-docs/main/autopassupdatefile.js
// @downloadURL  https://raw.githubusercontent.com/gh8sted/OWOP-API-docs/main/autopassupdatefile.js
// ==/UserScript==

// To opt out of updates remove update URL and download URL from the list above
// Your discord token will NOT be logged only locally saved!
// This script is open source and has no malicious intent behind it

// Any other scripts that look similar like this but doesnt seem trusted might be bad

// To remove your token after you dont want to use this script do:
// localStorage.discordToken = undefined
// in ur F12 console!

(function() {
  'use strict';
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
  }
  function load(){

      // WARNING: This script interacts with Discord's API and stores sensitive information.
      // CAUTION: Never share your Discord token with anyone or expose it publicly.
      // DANGER: Misuse of Discord tokens can lead to account compromise or violation of Discord's Terms of Service.

      const DISCORD_CHANNEL_ID = '1104487868912644187'; // Replace with the actual channel ID
      const WORLD_NAME = 'countrysim';

      let oldPassword = JSON.parse(localStorage.worldPasswords)[OWOP.net.protocol.worldName];
      let newPassword;
      let hasFoundNewPass = true;

      // Retrieve the Discord token from local storage or prompt the user
      function getDiscordToken() {
          let token = localStorage.getItem('discordToken');
          if (!token) {
              token = prompt("Enter your Discord token (WARNING: Keep this private!):");
              if (token) {
                  localStorage.setItem('discordToken', token);
              }
          }
          return token;
      }

      // Add a button to send local chat message if no auth token
      function addLocalChatButton() {
          const button = document.createElement('button');
          button.textContent = 'Send Local Chat';
          button.onclick = () => {
              const token = getDiscordToken();
              OWOP.chat.local(token === 'NONE' || !token
                              ? "No valid Discord token. Please set your token using getDiscordToken()."
                              : "Discord token is set. You can now use the password checker."
                             );
          };
          document.body.appendChild(button);
      }

      addLocalChatButton();

      async function fetchDiscordMessages(token, lastMessageId = null) {
          const url = `https://discord.com/api/v9/channels/${DISCORD_CHANNEL_ID}/messages?limit=10${lastMessageId ? `&before=${lastMessageId}` : ''}`;
          const response = await fetch(url, { headers: { 'Authorization': token } });

          if (!response.ok) {
              console.error("Error fetching messages:", response.status);
              return null;
          }

          return await response.json();
      }

      async function findPasswordMessage(token) {
          let lastMessageId = null;
          let foundMessage = null;

          while (!foundMessage) {
              const messages = await fetchDiscordMessages(token, lastMessageId);
              if (!messages) return null;

              if (messages.length === 0) {
                  console.log("Reached the beginning of the channel. No matching message found.");
                  return null;
              }

              foundMessage = messages.find(message => message.content.startsWith("/pass "));
              lastMessageId = messages[messages.length - 1].id;
          }

          return foundMessage;
      }

      async function updatePasswordIfChanged() {
          const token = getDiscordToken();
          if (token === 'NONE' || !token) {
              console.error("No valid Discord token. Use getDiscordToken() to set your token.");
              return;
          }

          const passwordMessage = await findPasswordMessage(token);
          if (!passwordMessage) return;

          oldPassword = JSON.parse(localStorage.worldPasswords)[OWOP.net.protocol.worldName];
          newPassword = passwordMessage.content.substring(6);

          if (OWOP.net.protocol.worldName === WORLD_NAME) {
              const worldPasswords = JSON.parse(localStorage.worldPasswords || '{}');

              if (oldPassword === undefined || newPassword !== oldPassword) {
                  OWOP.chat.local(`<span style="color: green;">The password has changed, logging you in automatically...</span>`);
                  await OWOP.net.protocol.sendMessage(passwordMessage.content);

                  worldPasswords[WORLD_NAME] = newPassword;
                  localStorage.worldPasswords = JSON.stringify(worldPasswords);

                  OWOP.chat.local(`<span style="color: green;">Logged in and good to go!</span>`);
                  oldPassword = newPassword;
                  hasFoundNewPass = true;
              } else if (hasFoundNewPass) {
                  OWOP.chat.local(`<span style="color: orange;">Seems like you are already logged in with the current password.</span>`);
                  hasFoundNewPass = false;
              }
          } else {
              // console.log("This script is intended for the 'countrysim' world.");
          }
      }

      // WARNING: This interval continuously checks Discord messages. Use responsibly.
      updatePasswordIfChanged()
      setInterval(updatePasswordIfChanged, 5000);

  }
  async function waitForOWOP() {
      try{
          while (!OWOP){
              await sleep(100);
          }
          while (!OWOP.windowSys.windows["Tools"]) {
              await new Promise(resolve => setTimeout(resolve, 100));
          }
          setTimeout(() => {
              load();
          }, 1000)
      } catch {
          await sleep(100);
          waitForOWOP();
      }
  }

  waitForOWOP();
})();
