// Service content lives in site.ts (single source of truth). This module
// re-exports it under the conventional path used by the section components.
export { services, getService } from "./site";
export type { Service, HelpItem } from "./site";
