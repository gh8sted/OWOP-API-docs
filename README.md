# OWOP-API-docs

Welcome to the OWOP API documentation! This repository provides a comprehensive guide to the OWOP (Our World of Pixels) API, complete with explanations, code snippets, and examples.

## Overview

This documentation will help you understand how to interact with various aspects of OWOP through the browser's console. You'll learn how to access and manipulate elements like the camera, chat, cursors, and more.

**Note:** The syntax uses dot notation (e.g., `OWOP.camera.x`).  Type these commands directly into your browser's console to see the results.

## API Reference

### `OWOP`

The main object containing various OWOP API components.

#### `OWOP.RANK`

Contains static integer values representing different user ranks:

- `OWOP.RANK.NONE` (0): Default rank upon loading, assigned by moderators/admins, or when the world is locked.
- `OWOP.RANK.USER` (1): Assigned after logging in or if no world password is set.
- `OWOP.RANK.MODERATOR` (2): Assigned by admins in your world or globally via `/modlogin` (for staff members).
- `OWOP.RANK.ADMIN` (3): Reserved for administrators, accessed via `/adminlogin` (highly confidential).

#### `OWOP.camera`

Represents the in-game camera:

- `OWOP.camera.isVisible(x, y, width, height)`: Checks if a specific area (defined by coordinates and dimensions) is visible within the camera's viewport. Used for optimizing rendering.
- `OWOP.camera.x`: The x-coordinate of the camera's center.
- `OWOP.camera.y`: The y-coordinate of the camera's center.

#### `OWOP.chat`

Provides methods for interacting with the chat system:

- `OWOP.chat.clear()`: Clears the chat window.
- `OWOP.chat.local("message")`: Sends a message visible only to you (displayed in red).
- `OWOP.chat.send("message")`: Sends a message to the public chat.
- `OWOP.chat.onDevMsg(callback)`: Assigns a callback function to handle developer messages. Example: Disabling dev chat:
  ```javascript
  OWOP.chat.onDevMsg = (text) => {
    OWOP.main.showDevChat(false); 
  };
  ```
- `OWOP.chat.sendModifier(callback)`: Modifies outgoing chat messages. Example: Time command:
  ```javascript
  OWOP.chat.sendModifier = (text) => {
    if (text === "/time") {
      const time = new Date().toLocaleTimeString();
      OWOP.chat.local(`The current time is: ${time}`);
      return null; // Prevent the original "/time" from being sent
    } else {
      return text;
    }
  };
  ```
- `OWOP.chat.recvModifier(callback)`: Modifies incoming chat messages before display. Example: Filtering "badword":
  ```javascript
  OWOP.chat.recvModifier = (text) => {
    if (text.includes("badword")) {
      return null; // Prevent the message from being displayed
    } else {
      return text;
    }
  };
  ```
- `OWOP.chat.postFormatRecvModifier(callback)`: Modifies incoming chat messages after formatting. Example: Highlighting "blue" in blue:
  ```javascript
  OWOP.chat.postFormatRecvModifier = (text) => {
    if (text.includes("blue")) {
      return `<span style="color: blue;">${text}</span>`;
    } else {
      return text;
    }
  };
  ```

#### `OWOP.cursors`

Contains data and images related to in-game tools/cursors. Each tool object typically includes:

- `hotspot`: [x, y] coordinates for the tool's interaction point relative to the image.
- `img.shadowblob`: The shadow version of the tool's image.
- `imgpos`: Position of the tool on the image (usually the same as `hotspot`).

Other properties:

- `.set`: Contains the image source (`.currentSrc` or `.baseURI`) for all tools.
- `.slotset`: Manages the visual display of the currently selected tool.

#### `OWOP.elements`

Holds references to various HTML elements within the OWOP website.

#### `OWOP.emit()`

Used to trigger or emit custom events within the OWOP framework.

## Contributing

Contributions to this documentation are welcome! If you find any errors or have suggestions for improvements, please feel free to submit a pull request.
