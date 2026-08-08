<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## React 19 & Next.js Guidelines

- **Derived State**: Never use `useEffect` + `setState` to calculate values derived from other state or props. Compute derived values directly during render.
- **Browser-Only Mount Effects**: When synchronizing with client-only stores like `localStorage` on initial mount, defer state updates (e.g., `setTimeout(..., 0)`) to prevent React 19 cascading render warnings during hydration.
- **File Economy**: Do not create unnecessary standalone helper or hook files unless explicitly requested by the user.
<!-- END:nextjs-agent-rules -->
