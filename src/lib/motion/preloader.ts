type MiniStorage = Pick<Storage, "getItem" | "setItem">;
const KEY = "ms-preloaded";

/** First load of the session -> show the preloader once. */
export function shouldShowPreloader(storage: MiniStorage): boolean {
  try {
    return storage.getItem(KEY) !== "1";
  } catch {
    return false;
  }
}

export function markPreloaded(storage: MiniStorage): void {
  try {
    storage.setItem(KEY, "1");
  } catch {
    /* private mode: ignore */
  }
}
