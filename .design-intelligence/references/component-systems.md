# Component and styling system decision guide

Select by **runtime first**, then component coverage, accessibility, ability to theme, maintenance, APIs, bundle, licensing, and team skill.

| Category | Candidate | Good fit | Tradeoff | Primary docs |
|---|---|---|---|---|
| Fully styled React | MUI | Material-influenced business apps | Strong visual conventions | https://mui.com/material-ui/ |
| Fully styled React | Mantine | Broad component coverage and customization | React ecosystem dependency | https://mantine.dev/ |
| Fully styled React | Ant Design | Data-heavy enterprise apps | Distinctive visual grammar | https://ant.design/ |
| Fully styled React | Chakra UI | Fast themeable product UI | Reuse its system conventions | https://chakra-ui.com/ |
| Fully styled React | Fluent UI | Microsoft-aligned productivity UI | Framework/design-language coupling | https://react.fluentui.dev/ |
| Source-based components | shadcn/ui | Owned components, significant visual customization | Maintainers own source updates | https://ui.shadcn.com/docs |
| Headless primitives | Radix UI | Custom React visual system | Style everything yourself | https://www.radix-ui.com/primitives |
| Headless primitives | React Aria | Accessibility-first custom behavior | More design implementation effort | https://react-spectrum.adobe.com/react-aria/ |
| Headless primitives | Base UI | Unstyled React components | Own complete visual system | https://base-ui.com/ |
| Styling engine | Tailwind CSS | Custom utility styling | Not a component library | https://tailwindcss.com/docs |
| Styling engine | Panda CSS | Typed recipes and tokens | Additional build integration | https://panda-css.com/ |
| React Native | React Native Paper | Material-oriented native UI | Not a generic web UI library | https://callstack.github.io/react-native-paper/ |
| React Native/Web | Tamagui | Cross-platform shared design language | Complex platform-specific details | https://tamagui.dev/ |
| Flutter | Flutter Material / Cupertino | Native Flutter UI | Flutter-specific APIs | https://docs.flutter.dev/ui/widgets |
| Native Apple | SwiftUI | Platform-native Apple controls | Not a web framework | https://developer.apple.com/xcode/swiftui/ |

## Selection protocol

1. Inspect existing framework and dependency tree.
2. List mandatory components and complex interaction requirements (dialogs, menus, grids, trees, data tables, form validation).
3. Compare two or three viable candidates and list upgrade/maintenance implications.
4. Choose one main interaction primitive approach. Mixing headless systems across complex components can produce inconsistent semantics.
5. Distinguish an inspiration style (Liquid Glass/neobrutalism) from a component engine.
6. Check latest official docs for versions, licensing, SSR/hydration, mobile support and installation commands before execution.

Avoid defaulting to shadcn/ui in Vue, React Native, SwiftUI, or Flutter projects.
