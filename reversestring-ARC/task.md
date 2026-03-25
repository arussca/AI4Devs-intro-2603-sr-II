# Reverse String — Task List

## 1. Project Documentation

- [x] 1.1 Create `plan.md` with C4 architecture, state machine diagrams, and BDD scenarios
- [x] 1.2 Create `task.md` with full implementation task list
- [x] 1.3 Create `user-manual.md` with basic user guide

## 2. DOM Structure

- [x] 2.1 Initialize `script.js` with `DOMContentLoaded` bootstrap
- [x] 2.2 Implement `inject_styles()` (empty CSS block for now)
- [x] 2.3 Implement `create_dom_elements()` creating all 5 UI elements inside `#container`
- [x] 2.4 Call `inject_styles()` and `create_dom_elements()` from `init()`

## 3. Layout and Vertical Alignment

- [x] 3.1 Add `#container` CSS: `display: flex`, `flex-direction: column`, `align-items: flex-start`, `gap: 16px`
- [x] 3.2 Add `body` CSS: padding and system font-family
- [x] 3.3 Set `max-width: 600px` on `#container`

## 4. Visual Styles

- [x] 4.1 Style `#title`: `font-size: 26px`, `font-weight: 700`, dark color
- [x] 4.2 Style `#user_input`: border, border-radius, padding, focus ring
- [x] 4.3 Style `#reverse_button`: blue background (`#3b82f6`), white text, border-radius, hover state
- [x] 4.4 Style `#reversed_text`: disabled appearance, light gray background (`#f9fafb`)
- [x] 4.5 Style `#copy_button`: gray background (`#6b7280`), white text, border-radius, hover state

## 5. Core Business Logic

- [x] 5.1 Implement `reverse_string(text)` with JSDoc
- [x] 5.2 Implement `copy_to_clipboard(text)` with JSDoc
- [x] 5.3 Verify: `reverse_string("I think AI4Devs is awesome!")` returns `"!emosewa si sveD4IA kniht I"`

## 6. reverse_button State Machine

- [x] 6.1 Define `REVERSE_BUTTON_STATE` frozen constants (`HIDDEN`, `VISIBLE`)
- [x] 6.2 Declare `reverse_button_current_state = REVERSE_BUTTON_STATE.HIDDEN`
- [x] 6.3 Implement `apply_reverse_button_state()` toggling DOM `display` style
- [x] 6.4 Implement `transition_reverse_button(user_input_length)` with FSM logic

## 7. reversed_text State Machine

- [x] 7.1 Define `REVERSED_TEXT_STATE` frozen constants (`EMPTY`, `READY`, `UPDATE`)
- [x] 7.2 Declare `reversed_text_current_state = REVERSED_TEXT_STATE.EMPTY` and `reversed_text_snapshot = ""`
- [x] 7.3 Implement `apply_reversed_text_state()` for all 3 states
- [x] 7.4 Implement `transition_reversed_text(trigger, user_input_length)` with full FSM switch

## 8. Event Handlers

- [x] 8.1 Implement `on_user_input_change(event)` calling both FSM transitions
- [x] 8.2 Implement `on_reverse_button_click()` calling `transition_reversed_text`
- [x] 8.3 Implement `on_copy_button_click()` with error handling

## 9. Initialization and Event Wiring

- [x] 9.1 Complete `init()`: call `inject_styles()`, `create_dom_elements()`, `apply_reverse_button_state()`
- [x] 9.2 Bind `input` event on `#user_input` → `on_user_input_change`
- [x] 9.3 Bind `click` event on `#reverse_button` → `on_reverse_button_click`
- [x] 9.4 Bind `click` event on `#copy_button` → `on_copy_button_click`
- [x] 9.5 Register `DOMContentLoaded` → `init`

## 10. Interaction Documentation

- [x] 10.1 Update `prompts.md` with the full AI interaction used to produce this solution
