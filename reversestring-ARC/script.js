// ============================================================
// STYLES INJECTION
// ============================================================

/**
 * Injects all required CSS styles into the document head.
 */
function inject_styles() {
  const style = document.createElement("style");
  style.textContent = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #ffffff;
      padding: 32px;
    }

    #container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      max-width: 600px;
    }

    #title {
      font-size: 26px;
      font-weight: 700;
      color: #1f2937;
    }

    #user_input {
      width: 100%;
      padding: 10px 14px;
      font-size: 15px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      outline: none;
      color: #374151;
      background-color: #ffffff;
    }

    #user_input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    #reverse_button {
      display: none;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      background-color: #3b82f6;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    #reverse_button:hover {
      background-color: #2563eb;
    }

    #reversed_text {
      width: 100%;
      padding: 10px 14px;
      font-size: 15px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      color: #374151;
      background-color: #f9fafb;
      cursor: default;
    }

    #copy_button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      background-color: #6b7280;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    #copy_button:hover {
      background-color: #4b5563;
    }
  `;
  document.head.appendChild(style);
}

// ============================================================
// DOM CREATION
// ============================================================

/**
 * Creates and appends all UI elements to the document body.
 */
function create_dom_elements() {
  const container = document.createElement("div");
  container.id = "container";

  const title = document.createElement("h1");
  title.id = "title";
  title.textContent = "Reverse String";

  const user_input = document.createElement("input");
  user_input.type = "text";
  user_input.id = "user_input";
  user_input.placeholder = "Enter text to reverse...";

  const reverse_button = document.createElement("button");
  reverse_button.id = "reverse_button";
  reverse_button.innerHTML = "Reverse &#x1F504;";

  const reversed_text = document.createElement("input");
  reversed_text.type = "text";
  reversed_text.id = "reversed_text";
  reversed_text.disabled = true;
  reversed_text.placeholder = "Reversed text will appear here...";

  const copy_button = document.createElement("button");
  copy_button.id = "copy_button";
  copy_button.innerHTML = "Copy &#x1F4CB;";

  container.appendChild(title);
  container.appendChild(user_input);
  container.appendChild(reverse_button);
  container.appendChild(reversed_text);
  container.appendChild(copy_button);

  document.body.appendChild(container);
}

// ============================================================
// BUSINESS LOGIC
// ============================================================

/**
 * Reverses the order of characters in a string.
 * @param {string} text - The input string to reverse.
 * @returns {string} The reversed string.
 */
function reverse_string(text) {
  return text.split("").reverse().join("");
}

/**
 * Copies the given text to the system clipboard.
 * @param {string} text - The text to write to the clipboard.
 * @returns {Promise<void>}
 */
async function copy_to_clipboard(text) {
  await navigator.clipboard.writeText(text);
}

// ============================================================
// STATE MACHINES
// ============================================================

const REVERSE_BUTTON_STATE = Object.freeze({
  HIDDEN: "reverse_button_hidden",
  VISIBLE: "reverse_button_visible",
});

const REVERSED_TEXT_STATE = Object.freeze({
  EMPTY: "reversed_text_empty",
  READY: "reversed_text_ready",
  UPDATE: "reversed_text_update",
});

let reverse_button_current_state = REVERSE_BUTTON_STATE.HIDDEN;
let reversed_text_current_state = REVERSED_TEXT_STATE.EMPTY;
let reversed_text_snapshot = "";

/**
 * Applies the current reverse_button state to the DOM.
 */
function apply_reverse_button_state() {
  const btn = document.getElementById("reverse_button");
  btn.style.display =
    reverse_button_current_state === REVERSE_BUTTON_STATE.VISIBLE
      ? "inline-flex"
      : "none";
}

/**
 * Evaluates and transitions the reverse_button FSM based on input length.
 * @param {number} user_input_length - Current character count in user_input.
 */
function transition_reverse_button(user_input_length) {
  const previous_state = reverse_button_current_state;

  if (
    user_input_length >= 3 &&
    reverse_button_current_state === REVERSE_BUTTON_STATE.HIDDEN
  ) {
    reverse_button_current_state = REVERSE_BUTTON_STATE.VISIBLE;
  } else if (
    user_input_length < 3 &&
    reverse_button_current_state === REVERSE_BUTTON_STATE.VISIBLE
  ) {
    reverse_button_current_state = REVERSE_BUTTON_STATE.HIDDEN;
  }

  if (previous_state !== reverse_button_current_state) {
    apply_reverse_button_state();
  }
}

/**
 * Applies the current reversed_text state to the DOM.
 */
function apply_reversed_text_state() {
  const output = document.getElementById("reversed_text");
  const input_value = document.getElementById("user_input").value;

  switch (reversed_text_current_state) {
    case REVERSED_TEXT_STATE.EMPTY:
      output.value = "";
      break;
    case REVERSED_TEXT_STATE.READY:
      output.value = reversed_text_snapshot;
      break;
    case REVERSED_TEXT_STATE.UPDATE:
      output.value = reverse_string(input_value);
      break;
  }
}

/**
 * Evaluates and transitions the reversed_text FSM.
 * @param {"input_change"|"reverse_button_click"} trigger - The event that caused this evaluation.
 * @param {number} user_input_length - Current character count in user_input.
 */
function transition_reversed_text(trigger, user_input_length) {
  const input_value = document.getElementById("user_input").value;
  const previous_state = reversed_text_current_state;

  switch (reversed_text_current_state) {
    case REVERSED_TEXT_STATE.EMPTY:
      if (
        trigger === "reverse_button_click" &&
        user_input_length >= 3 &&
        reverse_button_current_state === REVERSE_BUTTON_STATE.VISIBLE
      ) {
        reversed_text_snapshot = reverse_string(input_value);
        reversed_text_current_state = REVERSED_TEXT_STATE.READY;
      }
      break;

    case REVERSED_TEXT_STATE.READY:
      if (
        user_input_length < 3 ||
        reverse_button_current_state === REVERSE_BUTTON_STATE.HIDDEN
      ) {
        reversed_text_current_state = REVERSED_TEXT_STATE.EMPTY;
      } else if (
        user_input_length > 3 &&
        reverse_button_current_state === REVERSE_BUTTON_STATE.VISIBLE
      ) {
        reversed_text_current_state = REVERSED_TEXT_STATE.UPDATE;
      }
      break;

    case REVERSED_TEXT_STATE.UPDATE:
      if (
        user_input_length < 3 ||
        reverse_button_current_state === REVERSE_BUTTON_STATE.HIDDEN
      ) {
        reversed_text_current_state = REVERSED_TEXT_STATE.EMPTY;
      }
      break;
  }

  const state_changed = previous_state !== reversed_text_current_state;
  const is_live_update = reversed_text_current_state === REVERSED_TEXT_STATE.UPDATE;

  if (state_changed || is_live_update) {
    apply_reversed_text_state();
  }
}

// ============================================================
// EVENT HANDLERS
// ============================================================

/**
 * Handles input events on user_input.
 * Triggers both FSM evaluations on every keystroke.
 * @param {InputEvent} event
 */
function on_user_input_change(event) {
  const length = event.target.value.length;
  transition_reverse_button(length);
  transition_reversed_text("input_change", length);
}

/**
 * Handles click events on reverse_button.
 * Triggers the reversed_text FSM with the button click event.
 */
function on_reverse_button_click() {
  const input = document.getElementById("user_input");
  const length = input.value.length;
  transition_reversed_text("reverse_button_click", length);
}

/**
 * Handles click events on copy_button.
 * Copies the current content of reversed_text to the clipboard.
 * @returns {Promise<void>}
 */
async function on_copy_button_click() {
  const reversed = document.getElementById("reversed_text").value;
  if (reversed) {
    try {
      await copy_to_clipboard(reversed);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  }
}

// ============================================================
// INITIALIZATION
// ============================================================

/**
 * Entry point. Injects styles, creates DOM, applies initial states,
 * and binds all event handlers.
 */
function init() {
  inject_styles();
  create_dom_elements();
  apply_reverse_button_state();

  document
    .getElementById("user_input")
    .addEventListener("input", on_user_input_change);

  document
    .getElementById("reverse_button")
    .addEventListener("click", on_reverse_button_click);

  document
    .getElementById("copy_button")
    .addEventListener("click", on_copy_button_click);
}

document.addEventListener("DOMContentLoaded", init);
