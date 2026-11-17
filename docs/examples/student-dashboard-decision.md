# Student management dashboard: component-system decision

**Decision date:** 2026-11-17  
**Scope:** React + Vite student management dashboard; research only. No packages were installed and no application was created.  
**Research checked:** 2026-11-17 against the repository reference material and the official documentation linked below.

## Context and decision criteria

The target is a web dashboard with a large student data table, search, filters, CRUD forms, responsive layouts, and summary dashboards. The repository guidance says to choose by runtime first, distinguish a fully styled library from source-owned components, target WCAG 2.2 AA with manual verification, and avoid treating a visual style as the component engine.

All three candidates are viable for React + Vite:

- **MUI** is a fully styled React system. Its core library advertises 40+ building-block components, and MUI X adds Data Grid, charts, date/time pickers, and tree view. The grid is available in Community, Pro, and Premium plans.
- **Mantine** is a fully styled React system with core components, hooks, a form package, dates, charts, notifications, modals, and Spotlight. It is explicitly documented with a Vite setup.
- **shadcn/ui** is source-code distribution, not a conventional runtime component package. Its Vite setup adds component source into the app and its data-table guide composes a Table with TanStack Table.

## Comparison

| Criterion | MUI | Mantine | shadcn/ui |
|---|---|---|---|
| Component coverage | Broad core coverage plus the most directly relevant first-party grid and dashboard-adjacent packages. | Broad core coverage, useful hooks/forms/dates/charts/notifications; no equivalent core data-grid product in the reviewed docs. | Good set of composable primitives and patterns, but coverage is assembled per project; the official table is intentionally a recipe rather than a single data-grid component. |
| Customizability | Strong theme, `sx`, slot, and component override APIs, but the Material grammar remains a visible starting point. | Strong theme and style APIs with less Material-specific visual baggage; still a library with its own conventions. | Highest visual ownership: edit the copied source and CSS variables directly. The cost is that every customization becomes application-owned code. |
| Accessibility foundations | Mature semantics and keyboard behavior in core; Data Grid documents composite-widget keyboard navigation and row-header semantics. MUI’s own report is partial and says the finished app is not automatically accessible. | Mantine documents WAI-ARIA roles/attributes, keyboard support, focus management, screen-reader testing, and axe coverage; app-level labels, contrast, and keyboard testing remain required. | Depends on the copied component implementation and how it is composed. Official form and table examples show accessible labels/errors and keyboard-oriented primitives, but the application owns the final integration and regression testing. |
| Performance considerations | Tree-shake imports where practical; Data Grid virtualization is valuable for large datasets, but the grid and styling/runtime stack add weight. Use server-side pagination/filtering for real student populations and measure the actual production bundle. | Core components are modular, but a dashboard may pull several packages. A separate table solution means its rendering and virtualization strategy must be evaluated independently. | Per-component source ownership can keep the surface area focused, and Tailwind output can be small when configured well. TanStack/table is headless: it does not render or virtualize rows for you, so large-table performance is an implementation responsibility. |
| Development complexity | Lowest for this feature set: ready-made grid APIs, filters, pagination, selection, editing, and familiar form controls. Extra complexity appears when aligning MUI Core, MUI X, theming, and licensing. | Low-to-medium: pleasant primitives and an integrated form hook, but the team must choose and integrate a data-grid/table strategy. | Highest: Tailwind/Vite setup, source conventions, primitives, form state/validation, table state, virtualization, and accessibility QA must be coordinated by the team. |
| Maintenance | Central upstream maintenance; track MUI Core and MUI X compatibility and breaking changes. Advanced X features may create paid-plan and vendor dependency. | Central upstream maintenance across `@mantine/*`; track styling and major-version changes. External table integrations add another upgrade surface. | The team maintains copied component source and must intentionally pull upstream updates. Fewer vendor abstractions, but more internal ownership and review. |
| License / lock-in | Core is open source; MUI X Community is MIT-licensed while Pro/Premium are commercially licensed. Strong API/vendor coupling if advanced X features are adopted. | MIT-licensed, with React ecosystem coupling but relatively low commercial lock-in. | Source is in the repository, reducing runtime vendor lock-in; verify the license of each generated component and dependency and budget for internal ownership. |
| Dashboard fit | **Best overall** for a data-heavy admin dashboard, especially if the Community grid is sufficient or a paid grid plan is acceptable. | Strong fit for a custom-branded dashboard with moderate table complexity. | Strong fit when bespoke visual language and source ownership outweigh delivery speed. |

## Recommendation

Choose **MUI Core plus MUI X Data Grid Community initially**, with the grid behind a small application-level table adapter. Reassess Pro/Premium only if the requirements specifically need features unavailable in Community, such as advanced grid capabilities documented by MUI’s plan comparison.

Why this is the primary approach:

1. The student list is the riskiest surface: sorting, filtering, selection, pagination, dense layouts, keyboard navigation, and large-data rendering are all first-class concerns. MUI has a dedicated, documented grid rather than requiring the team to assemble those behaviors.
2. MUI’s core controls cover the surrounding forms, search, filters, dialogs, navigation, cards, and responsive layout primitives, so the dashboard can share one interaction and theming system.
3. The accessibility foundation is inspectable: MUI documents grid keyboard behavior and row headers, while also explicitly assigning application responsibilities. That makes it easier to define a real manual QA plan instead of assuming the library is a compliance certificate.

Recommended boundaries:

- Keep data fetching, server-side filtering/pagination, domain validation, and authorization outside MUI components.
- Use semantic labels, error text, visible focus, responsive reflow, and reduced-motion behavior from the application design profile.
- Start with a neutral/custom MUI theme rather than accepting Material defaults as the product identity. Avoid styling every cell through ad hoc overrides; define reusable tokens and slots.
- Prefer the smallest required MUI X plan. A paid grid is a product/licensing decision, not an automatic technical requirement.
- Test the actual student workflows with keyboard-only navigation, a screen reader, zoom/reflow, contrast, loading/empty/error states, and representative row counts. Automated scans are supporting evidence only.

## Alternatives and explicit non-selections

### Mantine: best alternative when visual customization is more important than grid depth

Select Mantine instead if the team wants a less Material-shaped visual baseline, values its integrated `@mantine/form` and hooks, and is comfortable pairing it with a separately evaluated table/grid solution. It is a credible choice for a dashboard with moderate table complexity. It is not the primary recommendation because the reviewed official surface does not provide MUI X’s directly comparable first-party data-grid path.

### shadcn/ui: best alternative when the team wants to own the design system

Select shadcn/ui instead if the product has a strong bespoke visual language, the team is comfortable owning component source, and the table requirements justify a deliberate TanStack Table plus virtualization architecture. It is not the primary recommendation because the requested dashboard’s hardest behaviors are assembled and maintained by the application team rather than supplied as one integrated system.

## Expected dependency decision if implementation is approved

No dependency change is authorized by this document. If the user later approves implementation, the likely initial package family is:

- MUI Core and its styling peer dependencies.
- MUI X Data Grid Community only if its feature set meets the acceptance criteria.
- An application form/validation strategy selected separately; do not add overlapping form libraries by default.

Do not add Mantine or shadcn/ui alongside MUI for overlapping controls. Mixing systems would increase bundle, design-token, accessibility, and maintenance surfaces without a demonstrated need.

## Official sources checked

- Repository reference: [`component-systems.md`](../../.design-intelligence/references/component-systems.md)
- Repository reference: [`research-2026-11.md`](../../.design-intelligence/references/research-2026-11.md)
- Repository reference: [`accessibility-and-qa.md`](../../.design-intelligence/references/accessibility-and-qa.md)
- [MUI overview and component coverage](https://mui.com/material-ui/)
- [MUI supported platforms and React compatibility](https://mui.com/material-ui/getting-started/supported-platforms/)
- [MUI X Data Grid quickstart and plan packaging](https://mui.com/x/react-data-grid/quickstart/)
- [MUI X Data Grid accessibility and keyboard navigation](https://mui.com/x/react-data-grid/accessibility)
- [MUI accessibility conformance report and limitations](https://mui.com/material-ui/getting-started/accessibility/)
- [MUI X licensing](https://mui.com/x/introduction/licensing/)
- [Mantine Vite setup and package coverage](https://mantine.dev/getting-started/?g=vite)
- [Mantine accessibility guidance](https://help.mantine.dev/q/are-mantine-components-accessible)
- [Mantine form state and validation](https://mantine.dev/form/use-form/)
- [shadcn/ui Vite setup](https://ui.shadcn.com/docs/installation/vite)
- [shadcn/ui source ownership and customization](https://ui.shadcn.com/docs/new)
- [shadcn/ui data-table recipe with TanStack Table](https://ui.shadcn.com/docs/components/base/data-table)
- [shadcn/ui React Hook Form and Zod example](https://ui.shadcn.com/docs/forms/react-hook-form)

This is a reasoned fit assessment, not an independent benchmark. Bundle size, row-rendering throughput, and accessibility conformance should be measured in the eventual application with representative data and workflows.
