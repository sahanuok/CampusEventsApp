# Kelani Campus Events (CampusEventsApp)

- **Student Name:** Y.G.S.S. Pahansith
- **Student ID:** PS/2022/033
- **Course:** COSC 32152 / COST 32152 / BECS 3227 – Mobile Application Development (Assignment 01)
- **Department:** Department of Statistics & Computer Science, University of Kelaniya

---

## Demonstration Video

Watch the full application walkthrough demonstrating realistic data, tab & nested stack navigation, shared state, `AppState` background/foreground detection, and local notifications:

- **YouTube Demo Link:** [Watch CampusEventsApp Demo](https://youtu.be/dyPf6h1D44g?si=BlMSlSvl84ThVftH)

---

## 1. Application Overview & Problem Solved

**Kelani Campus Events** is a multi-screen React Native mobile application built with JavaScript and Expo Router.

**Problem Solved:** University students frequently miss out on hackathons, workshops, cultural shows, sports tournaments, and academic symposia because announcements are scattered across notice boards and messaging groups. This application centralizes upcoming campus events in one clean interface where students can filter events by category, inspect full venue/organizer details, bookmark events of interest, and receive immediate local notification reminders.

---

## 2. Screens & Their Purpose

The application consists of **3 primary screens** organized under a Tab and Nested Stack navigation architecture:

1. **Events Feed Screen (`src/app/(tabs)/(home)/index.js`)**
   - Displays all upcoming campus events in a scrollable list using realistic, hard-coded data (`src/data/events.js`).
   - Provides a category filter modal (`All`, `Tech`, `Cultural`, `Sports`, `Academic`).
   - Displays a live `AppState` status banner at the top that detects when the user returns to the app from the background and records the refresh timestamp and resume count.
2. **Event Details Screen (`src/app/(tabs)/(home)/[id].js`)**
   - Accessible by tapping any event card via nested stack navigation using dynamic route parameters (`[id]`).
   - Displays the banner image, category, date, time, venue, organizer, and full description.
   - Allows the user to **Bookmark / Remove Bookmark** (updating global shared state and firing a local notification), trigger a direct **Reminder Notification**, or navigate back to the Events feed.
3. **Bookmarks Screen (`src/app/(tabs)/bookmarks.js`)**
   - Displays all events bookmarked by the user, synchronized in real time via shared state.
   - Shows a dynamic numeric badge on the bottom Bookmarks tab icon reflecting the total saved count.
   - Includes a **Remove** action backed by a confirmation `Modal` to prevent accidental removals, as well as a clean empty-state view when no events are saved.

---

## 3. Core React Native Components Implemented

| Component        | Where It Is Implemented                             | Purpose                                                                                                          |
| :--------------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **`View`**       | All screens (`index.js`, `[id].js`, `bookmarks.js`) | Structural layout containers, cards, status banners, and modal overlays                                          |
| **`Text`**       | All screens (`index.js`, `[id].js`, `bookmarks.js`) | Headings, category badges, dates, venues, descriptions, and status messages                                      |
| **`Image`**      | `index.js`, `[id].js`, `bookmarks.js`               | Event card headers, full-width detail banners, and bookmark thumbnails                                           |
| **`Pressable`**  | `index.js`, `[id].js`, `bookmarks.js`               | Interactive event cards, filter triggers, modal options, bookmark/reminder buttons, and explicit back navigation |
| **`FlatList`**   | `index.js`, `bookmarks.js`                          | Efficiently renders the hard-coded list of campus events and bookmarked items                                    |
| **`Modal`**      | `index.js` & `bookmarks.js`                         | Category filter selection dialog in `index.js`, and bookmark removal confirmation dialog in `bookmarks.js`       |
| **`ScrollView`** | `[id].js`                                           | Smooth vertical scrolling for full event details                                                                 |
| **`AppState`**   | `index.js`                                          | Native device API listener detecting `background`/`inactive` to `active` transitions                             |

---

## 4. Expo Router Structure (`src/app/`)

The app uses Expo Router file-based routing with a root stack wrapping a bottom tab navigator (`(tabs)`) and a nested stack navigator (`(home)`):

```text
src/
├── data/
│   └── events.js                 # Hard-coded realistic campus event records
├── context/
│   └── EventsContext.js          # Shared state (useState + Context) & expo-notifications logic
└── app/
    ├── _layout.js                # Root layout wrapping the app in EventsProvider
    └── (tabs)/
        ├── _layout.js            # Bottom Tab Navigator (Events & Bookmarks with badge)
        ├── bookmarks.js          # Bookmarks tab screen + removal confirmation Modal
        └── (home)/
            ├── _layout.js        # Nested Stack Navigator for Events -> Details flow
            ├── index.js          # Main Events feed (FlatList, Filter Modal, AppState)
            └── [id].js           # Dynamic Event Details screen with back navigation
```
