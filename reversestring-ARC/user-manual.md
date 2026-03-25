# Reverse String — User Manual

## Overview

Reverse String is a browser-based utility that instantly reverses any text you type. No installation required — open the page in any modern browser.

---

## Opening the Application

1. Navigate to the `reversestring-ARC/` folder.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. The page loads immediately with no external dependencies.

---

## Using the Application

### Step 1 — Enter your text

Click inside the input field labelled with the placeholder *"Enter text to reverse..."* and start typing.

> The **Reverse** button remains hidden until you have typed at least **3 characters**.

### Step 2 — Reverse the text

Once your input contains 3 or more characters, the **Reverse 🔄** button becomes visible. Click it to see the reversed string appear in the output field below.

**Example:**

| Input | Output |
|---|---|
| `Hello` | `olleH` |
| `I think AI4Devs is awesome!` | `!emosewa si sveD4IA kniht I` |

### Step 3 — Edit and auto-update

After clicking **Reverse**, if you continue typing (input length > 3), the output field updates automatically in real time — no need to click the button again.

### Step 4 — Copy the result

Click the **Copy 📋** button to copy the reversed text to your clipboard. You can then paste it anywhere.

---

## Behaviour Summary

| Situation | What happens |
|---|---|
| Input length < 3 | Reverse button hidden, output cleared |
| Input length ≥ 3 | Reverse button appears |
| Click Reverse (first time) | Reversed text appears in output |
| Keep typing (length > 3) after clicking | Output auto-updates live |
| Input drops below 3 | Output clears, button hides |
| Click Copy | Reversed text copied to clipboard |

---

## Browser Requirements

- Any modern browser with **JavaScript enabled**
- Clipboard copy requires a **secure context** (HTTPS or localhost). On plain `file://` protocol, clipboard access may be blocked by the browser.
