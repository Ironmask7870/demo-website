# L'Atelier Français - French Learning Portfolio Website

A premium, highly interactive single-page portfolio and dashboard website built for your French teacher with a "Modern Paris" style theme (Navy Blue, Crimson/Deep Red, White, and Light Gray) and elegant typography (Playfair Display + Poppins).

## Features Included

- **Interactive French Level Test**: 5-question multiple-choice quiz with real-time progress indicators and level grading (A1 to C1/C2).
- **Interactive France Map**: Custom SVG map highlighting Paris, Lyon, Marseille, Bordeaux, and Nice. Clicking markers displays travel phrases, descriptions, and food specialties.
- **Interactive Music Player**: Styled audio controller that simulates track changes, play/pause states, track listings, and visual seek feedback.
- **Student Zone Dashboard**: Interactive dashboard simulator where students can log in, view certificates, download materials, drag-and-drop homework (with upload animations), and write mock messages in the student forum.
- **Interactive Calendar Booking**: Grid calendar allowing students to pick dates and times for trial or 1-on-1 lessons, leading to a mock Stripe checkout overlay.
- **Exit intent Word Popup**: Detects when the user's mouse leaves the viewport top and displays a 3D-flippable card with a French word, pronunciation guide, and English translation.
- **Accreditation Logos & Accordion FAQs**: Trust badges and collapsible FAQ items.
- **Night Mode**: Smooth toggle switch in the navbar that swaps styles instantly and preserves the user's dark/light mode preference in LocalStorage.

---

## Adding Your Own Media Assets

To populate the layout with your own custom images and videos, copy your media files into the `/assets` folder and name them exactly as follows:

1. **`intro_thumbnail.webp`**: The thumbnail/cover image for the welcome video (16:9 ratio recommended).
2. **`teacher_profile.webp`**: The profile picture of the French teacher (3:4 ratio recommended).
3. **`cert_logo1.webp`**: Sorbonne University seal logo (1:1 ratio recommended).
4. **`cert_logo2.webp`**: France Éducation International seal logo (1:1 ratio recommended).
5. **`cert_logo3.webp`**: ACTFL Seal of Quality logo (1:1 ratio recommended).
6. **`teacher_intro.mp4`**: The welcome/introductory MP4 video file.

---

## Deploying on GitHub Pages (Step-by-Step)

Because this website is built using standard HTML5, CSS3, and Vanilla JavaScript with relative pathways, it is 100% compatible with GitHub Pages out-of-the-box:

1. Go to your repository on GitHub: [https://github.com/Ironmask7870/demo-website](https://github.com/Ironmask7870/demo-website)
2. Click on the **Settings** tab (gear icon at the top of the repository page).
3. Scroll down on the left sidebar navigation and click on **Pages** (under the "Code and automation" section).
4. Under the **Build and deployment** section, look for **Source** and ensure it is set to **Deploy from a branch**.
5. Under the **Branch** dropdown, change it from *None* to **`main`**, keep the folder set to **`/ (root)`**, and click **Save**.
6. Wait 1 to 2 minutes. GitHub will automatically deploy your site. 
7. Refresh the Settings > Pages screen. You will see a banner at the top displaying your live URL (e.g., `https://ironmask7870.github.io/demo-website/`).
