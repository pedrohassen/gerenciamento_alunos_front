// jsdom não implementa ResizeObserver, mas vários componentes do Vuetify dependem dele.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === "undefined") {
  (globalThis as any).ResizeObserver = ResizeObserverStub;
}
