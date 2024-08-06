# OWOP-API-docs

Welcome to the OWOP API documentation! This repository provides a comprehensive guide to the OWOP (Our World of Pixels) API, complete with explanations, code snippets, and examples.

## Overview

This documentation will help you understand how to interact with various aspects of OWOP through the browser's console. You'll learn how to access and manipulate elements like the camera, chat, cursors, and more.

**Note:** The syntax uses dot notation (e.g., `OWOP.camera.x`).  Type these commands directly into your browser's console to see the results.

## API Reference

### `OWOP`

The main object containing various OWOP API components.

#### Tools

- `OWOP.tools`: **[Placeholder: Add details about the `OWOP.tools` object here.]**

#### `OWOP.fx`

- `OWOP.fx`: **[Placeholder: Add details about the `OWOP.fx` object here.]**

#### `OWOP.RANK`

Contains static integer values representing different user ranks:

- `OWOP.RANK.NONE` (0): Default rank upon loading, assigned by moderators/admins, or when the world is locked.
- `OWOP.RANK.USER` (1): Assigned after logging in or if no world password is set.
- `OWOP.RANK.MODERATOR` (2): Assigned by admins in your world or globally via `/modlogin` (for staff members).
- `OWOP.RANK.ADMIN` (3): Reserved for administrators, accessed via `/adminlogin` (highly confidential).

#### `OWOP.player`

- `OWOP.player`: **[Placeholder: Add details about the `OWOP.player` object here.]**

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

#### `OWOP.world`

- `OWOP.world`: **[Placeholder: Add details about the `OWOP.world` object here.]**

#### `OWOP.mouse`

- `OWOP.mouse`: **[Placeholder: Add details about the `OWOP.mouse` object here.]**

#### `OWOP.cursors`

Contains data and images related to in-game tools/cursors. Each tool object typically includes:

- `hotspot`: [x, y] coordinates for the tool's interaction point relative to the image.
- `img.shadowblob`: The shadow version of the tool's image.
- `imgpos`: Position of the tool on the image (usually the same as `hotspot`).

Other properties:

- `.set`: Contains the image source (`.currentSrc` or `.baseURI`) for all tools.
- `.slotset`: Manages the visual display of the currently selected tool.

#### `OWOP.options`

- `OWOP.options`: **[Placeholder: Add details about the `OWOP.options` object here.]**

#### `OWOP.muted`

- `OWOP.muted`: An array of muted player IDs.

#### `OWOP.elements`

Holds references to various HTML elements within the OWOP website.

#### `OWOP.emit(event, ...args)`

Used to trigger or emit custom events within the OWOP framework.

- `event`: The name of the event to be emitted (string).
- `...args`: Any additional arguments to be passed to the event listeners.

**Example:**
```javascript
// Emit a custom event named 'myCustomEvent' with some data
OWOP.emit('myCustomEvent', 'Hello', 'World!');
```

#### `OWOP.events`, `OWOP.on(event, callback)`, and `OWOP.once(event, callback)`

`OWOP.events` contains static integer values representing different built-in OWOP events. 
- `OWOP.on()` is used to register a callback function to be executed when a specific event is triggered.
- `OWOP.once()` is the same as `OWOP.on()`, but the callback is executed only once.

**Example:** Listening for pixel placements (the `tilesUpdated` event):
```javascript
OWOP.on(OWOP.events.net.world.tilesUpdated, (log) => { 
    console.log(
      log[0].id,
      log[0].rgb,
      log[0].x,
      log[0].y
    );
}); 
```
- `tilesUpdated` will return an array of objects, each containing:
    - `id`: The ID of the player who placed the pixel.
    - `rgb`: The RGB color value of the pixel (as an 8-bit integer).
    - `x`: The x-coordinate of the placed pixel.
    - `y`: The y-coordinate of the placed pixel.


**List of Event IDs (from Neko's scripts):**

```javascript
{
    loaded: 1, // Whenever you load into OWOP  
    init: 2, // Whenever you initialize into OWOP
    tick: 3, // Whenever a tick has passed in OWOP
    toolsRendered: 4, // Whenever all tools have rendered
    toolsInitialized: 5, // Whenever all tools have initialized
    logoMakeRoom: 6, // ??? (Possibly related to UI adjustments for the logo)
    worldInitialized: 7, // Whenever the world is initialized
    windowAdded: 8, // Whenever a window has been added
    captchaToken: 9, // Whenever you get a new captcha token
    loadingCaptcha: 10, // Whenever you are loading a captcha
    addChunk: 11, // Whenever a chunk gets added to the renderer viewport
    rmChunk: 12, // Whenever a chunk gets removed from the renderer viewport
    updateChunk: 13, // Whenever a chunk gets updated
    camMoved: 14, // Whenever you move the camera
    camZoomed: 15, // Whenever you zoom the camera
    connecting: 16, // Whenever you are connecting to the server
    connected: 17, // Whenever you are connected to the server
    disconnected: 18, // Whenever you are disconnected from the server
    playerCount: 19, // Whenever the player count changes
    chat: 20,  // Whenever a new message is received in the chat
    devChat: 21, // Whenever a new message is received in the developer chat
    leave: 22, // Whenever a user leaves the world
    join: 23, // Whenever a user joins the world
    joining: 24, // Whenever a user is joining the world (before they are fully loaded)
    setId: 25, // Whenever the server assigns an ID to the player
    playersMoved: 26, // Whenever one or more users have moved
    playersLeft: 27, // Whenever one or more users have left
    tilesUpdated: 28, // Whenever one or more pixels have been changed
    teleported: 29, // Whenever a user teleports
    load: 30, // Whenever the game finishes loading
    unload: 31, // Whenever the game starts unloading (e.g., when not being focused on the OWOP tab)
    set: 32, // Whenever a chunk is set
    lock: 33, // Whenever a chunk is locked/unlocked
    allLoaded: 34,  // Whenever all chunks are loaded
    rank: 35, // Whenever the player's rank changes
    maxCount: 36, // Whenever the world reaches its maximum player limit
    donUntil: 37, // ??? (Possibly related to donation status)
    setupTools: 101 // When the tools have been set up
} // SOME EVENTS MIGHT "NOT WORK" CAUSE THEY ARENT GETTING CALLED! (or u might be using the wrong event?)
```


#### `OWOP.net`

- `OWOP.net`: **[Placeholder: Add details about the `OWOP.net` object here.]**

#### `OWOP.util`

- `OWOP.util`: **[Placeholder: Add details about the `OWOP.util` object here.]**

#### `OWOP.poke()`

- `OWOP.poke()`: **[Placeholder: Add details about the `OWOP.poke()` function here.]**

#### `OWOP.removeListener()`

- `OWOP.removeListener()`: **[Placeholder: Add details about the `OWOP.removeListener()` function here.]**

#### `OWOP.sounds`

- `OWOP.sounds`: **[Placeholder: Add details about the `OWOP.sounds` object here.]**

#### `OWOP.windowsys`

- `OWOP.windowsys`: **[Placeholder: Add details about the `OWOP.windowsys` object here.]**

#### `OWOP.renderer`

- `OWOP.renderer`: **[Placeholder: Add details about the `OWOP.renderer` object here.]**

#### `OWOP.camera`

Represents the in-game camera:

- `OWOP.camera.isVisible(x, y, width, height)`: Checks if a specific area (defined by coordinates and dimensions) is visible within the camera's viewport. Used for optimizing rendering.
- `OWOP.camera.x`: The x-coordinate of the camera's center.
- `OWOP.camera.y`: The y-coordinate of the camera's center.

## Contributing

Contributions to this documentation are welcome! If you find any errors or have suggestions for improvements, please feel free to submit a pull request.
