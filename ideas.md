# Jack — 3D Creator: Design Direction

## Chosen direction
**Neo-noir 3D showcase.** The user specified the visual direction: a near-black editorial portfolio for a 3D creator, with steel-blue gradient typography, oversized Kanit type, floating sculptural assets, high-contrast white interruptions, and vivid magenta/amber contact accents. The supplied visual assets and copy are the ground-truth presentation material.

## Design movement
Editorial brutalism softened by large radii and expressive 3D objects. The experience should feel like a motion-reel landing page: restrained in its palette, generous in its scale, and driven by kinetic scroll behavior.

## Core principles
- Let typography establish the hierarchy before decoration.
- Preserve a spacious, near-black canvas (#0C0C0C) so supplied 3D and motion work carries visual energy.
- Make every transition purposeful: entrance reveals, scroll parallax, magnetic portrait movement, character reveal, and stacked project cards.
- Keep motion performant and reduce unnecessary visual noise on small screens.

## Color philosophy
- **Foundation:** #0C0C0C (deep studio black)
- **Primary light:** #D7E2EA (cool blue-white)
- **Display gradient:** #646973 → #BBCCD7
- **Contrast surface:** #FFFFFF
- **CTA spectrum:** #18011F → #B600A8 → #7621B0 → #BE4C00

## Layout paradigm
One vertically composed, single-page portfolio: hero / reel / personal statement / capability list / project stack. Sections are expansive and use large rounded transitions at key shifts from black to white and back again. Desktop composition is broad and cinematic; mobile retains the hierarchy with deliberate, stable image and card reflow.

## Signature elements
- Massive clipped all-caps wordmarks rendered in a cool metallic gradient.
- A central portrait with a subtle, responsive magnetic pull.
- Paired, counter-moving rows of motion work.
- Four floating corner ornaments framing a character-by-character statement.
- White services canvas with oversized ordinal numbers.
- Three border-lit, sticky stacked project panels.

## Interaction philosophy
Navigation and CTA controls use real anchors, accessible labels, visible focus states, and lightweight hover states. Interactions should invite exploration without competing with the portfolio artwork. The magnetic effect is disabled for coarse pointers and reduced-motion users.

## Animation
Framer Motion supplies short staged entrances; scroll transforms drive marquee and project-card scale; a paragraph is progressively revealed by character opacity. Motion honors `prefers-reduced-motion` by avoiding distracting continuous or spatial motion where possible.

## Typography system
Kanit 300–900 is the sole display and body typeface. Display labels are dense, black-weight, uppercase, and fluidly scaled with clamp()/viewport units. Supporting content uses light/medium weights, wide tracking, and compact line lengths for readability.

## Brand essence and voice
**Jack is a meticulous, energetic 3D creator who builds imagery that feels tangible and memorable.** The voice is direct, confident, lowercase in personal copy, and concise in navigation and calls to action.

## Wordmark/logo
A simple “J” monogram: a dark, geometric hook and angled extrusion carved from a cool steel-blue square. The solid background, broad filled silhouette, and negative-space cut make it readable at favicon scale while echoing the site’s 3D editorial identity. It appears as the browser icon and project metadata, rather than competing with the hero wordmark.

## Signature brand color
Cool metal blue: **#BBCCD7**.
