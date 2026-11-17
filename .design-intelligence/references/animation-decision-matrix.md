# Motion / 3D decision matrix

| Need | First choice | Escalate only if | Docs |
|---|---|---|---|
| Basic hover/focus/status fades | CSS transitions or WAAPI | complex orchestration required | https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API |
| React component entrances, layouts, gestures | Motion | independent animation subsystem needed | https://motion.dev/docs/react |
| Long scroll-linked scenes, complex timeline | GSAP + ScrollTrigger | complex choreography is core to experience | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| True 3D and shaders | Three.js | real scene rendering improves product | https://threejs.org/docs/ |
| React-managed 3D | React Three Fiber | React ecosystem and actual 3D need exist | https://r3f.docs.pmnd.rs/ |
| Author-designed interactive animation | Rive | design assets/state machines available and licensed | https://rive.app/ |
| Authored illustrations/loading loops | dotLottie | source animation can be safely licensed and performant | https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/ |

## Performance and accessibility rules

- Measure first: animation should communicate a UI transition or state, not add arbitrary visual cost.
- Prefer opacity and transform; avoid animating layout properties on every frame when alternatives exist.
- Respect `prefers-reduced-motion`. Provide a real reduced-motion variant; large scale, parallax, scroll-linked and looping effects must be optional.
- Do not make interaction depend on a timeline completing; handle interruption and rapid input.
- Lazy-load heavy 3D; supply useful static fallback and allow users to reach content with effects disabled.
- Test touch/keyboard, low-power devices, layout shift, and rendering performance.

Motion reduced-motion API: https://motion.dev/docs/react-use-reduced-motion
