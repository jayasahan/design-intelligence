# Northstar student operations — design brief

## Audience and journey

The primary user is a school staff member who needs to scan student health, find a student quickly, and decide whether a check-in is needed. The core journey is: orient in the overview, notice a signal, filter the directory, open a record, and start a follow-up.

## Direction

“Calm operations” — a restrained, material-influenced workspace with a warm accent and strong information hierarchy. It favors confidence and legibility over decorative density. The existing Material Enterprise profile was used as a starting point, adapted with a blue-green primary, orange action accent, lower corner radius, and softer surfaces for a campus context.

## Success criteria

- A staff member can locate a known student with search or grade/status filters.
- Summary cards establish context without competing with the directory.
- Loading, empty, error and success states are understandable and recoverable.
- The experience remains usable at 375px, 768px and 1440px widths.
- Keyboard focus is visible; automated checks support, but do not replace, manual WCAG 2.2 AA review.

## Boundaries

Synthetic data only. No authentication, backend, personal data, write API, or production integration. Motion is limited to native interaction feedback and respects `prefers-reduced-motion`.
