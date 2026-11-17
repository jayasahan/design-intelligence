# Northstar design system notes

## v1.2.1 stabilization

Progress is derived from the selected synthetic cohort, not from search results. Counts sum to the cohort total. Each category rounds independently to the nearest integer, so other datasets can total 99% or 101%; the donut and corresponding bar use the same rounded value. The demo date is fixed and explicitly labeled.

The permanent drawer's child uses the available width instead of repeating its parent's border-inclusive 246px width. The grid keeps its own horizontal scrolling at narrow widths rather than extending a 700px root outside a clipped card. Mobile cards reduce decorative spacing while preserving control sizes. Keyboard focus uses a solid primary outline. The workspace label and profile badge use darker foreground/background combinations.

## Tokens and layout

- Primary: `#176B87`; deep primary: `#0F4D63`; action accent: `#D97742`.
- Canvas: `#F5F7F9`; surfaces: white; text: `#172B3A`; muted text: `#526575`.
- Spacing follows the MUI 8px rhythm; cards use 12px radius and a 1px `#E3E9EE` boundary.
- Desktop reserves 246px for navigation; the drawer becomes temporary below the MUI `md` breakpoint.
- Directory density is deliberately data-forward, with a minimum 44px control height and visible keyboard focus.

## Component contracts

- Navigation exposes the current section through selected state and remains keyboard operable.
- Summary cards communicate a label, value, and trend; color is supplementary, not the only signal.
- Student rows expose identity, grade, advisor, attendance, average, status, and a labeled detail action.
- Detail is a modal dialog with a heading, close action, summary fields, and a next action.
- Empty and error states include recovery guidance; loading communicates progress.

## Adaptations

The Material Enterprise sample profile was not copied as a production brand. Its neutral canvas, accessible dark text, and data-density principle were retained. The palette, surface treatment, radius, copy, and component composition were adapted for a fictional school operations product.
