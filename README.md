# Sianga Stephen | ICT251 Web Technologies, Activity 3

A responsive, interactive personal portfolio built with plain HTML5, CSS and JavaScript for Mulungushi University (ICT251). Deployed as a static site on Render through GitHub.

**Live site:** https://YOUR-SITE.onrender.com

Structure
index.html
css/styles.css
js/script.js
images/   (photo1.jpg, photo2.jpg, photo3.jpg)
videos/   (intro.mp4, voice.mp3)

## Sections

About Me, My Hobbies, My Learning Plan (list, table and study calculator), Projects \& Skills, My Photos, My Media (video and audio with written summaries) and Contact.

## JavaScript features (all in js/script.js`)

1. **Contact form validation and preview (compulsory).** Rejects empty or spaces-only name and message and badly formatted emails. A valid form shows a local preview on the page. Nothing is sent. Uses `event.preventDefault()` and `textContent`.
2. **Theme switch.** The "Theme" button in the navigation toggles light and dark appearance. The choice is saved with `localStorage`.
3. **Study hours calculator.** Enter hours per day and days per week to get total weekly hours. Rejects blank, non-numeric and negative hours, and days outside 1 to 7.
4. **Mobile navigation.** On screens 700px wide or less, the Menu button opens and closes the links. The button shows Open or Closed, and Escape closes the menu.

## How to test

* **Form:** submit empty, then spaces only, then `abc` as email (all rejected). Fill in valid data to see the preview.
* **Theme:** click the Theme button and check both themes are readable. Refresh to see it remembered.
* **Calculator:** try `2` and `5` (gives 10 hours), then blank, `abc`, `-1`, `25` hours and `0` or `8` days (all rejected).
* **Menu:** narrow the browser to about 375px, then open and close the Menu button and use a link.

## Sources

* MDN Web Docs: https://developer.mozilla.org/en-US/docs/Learn
* Course notes and activity brief for ICT251.

