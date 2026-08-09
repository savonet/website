import React, { useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./try.module.css";

// The playground is two artifacts built by liquidsoap's CI and dropped into /try:
// interactive_js.bc.js is the interpreter compiled with js_of_ocaml, and
// playground.bundle.js is the CodeMirror editor around it.
//
// Both reach for elements by id -- interactive_js.ml uses getElementById_exn, which
// throws on a missing one -- and the editor replaces the contents of #input outright.
// React must therefore not own any of it: this component renders the markup once and
// never re-renders, and everything below the container is plain DOM. Mixing the two
// would let a re-render reconcile the subtree the editor mounted into and destroy it.

const markup = (s: Record<string, string>) => `
  <div class="${s.switcher}">
    <button type="button" id="switch-code">See Code</button>
    <button type="button" id="switch-results">See Results</button>
  </div>

  <div class="${s.panes}">
    <section class="${s.pane}" id="code">
      <div class="${s.paneTitle}">Script</div>
      <div class="${s.editor}" id="input">
        <textarea rows="20" cols="70" spellcheck="false"
          aria-label="Liquidsoap script"># Interpreter loading.. ⏳</textarea>
      </div>
      <div class="${s.toolbar}">
        <label class="${s.hint}" for="themes">Theme</label>
        <select id="themes" aria-label="Editor theme"></select>
        <span class="${s.spacer}"></span>
        <span class="${s.loading}" data-loading>
          <span class="${s.spinner}" aria-hidden="true"></span> Loading the interpreter…
        </span>
        <span class="${s.hint}" data-shortcut hidden>
          <kbd class="${s.kbd}" data-mod></kbd> <kbd class="${s.kbd}">↵</kbd>
        </span>
        <button type="button" id="clear" class="${s.quiet}" disabled>Clear</button>
        <button type="button" id="format" disabled>Format</button>
        <button type="button" id="execute" class="${s.primary}" disabled>Execute</button>
      </div>
    </section>

    <section class="${s.pane} ${s.hiddenSmall}" id="results">
      <div class="${s.paneTitle}">Output</div>
      <div class="${s.editor}">
        <textarea id="output" rows="20" cols="70" readonly aria-label="Script output"></textarea>
      </div>
    </section>
  </div>
`;

function Playground(): React.ReactElement {
  const bundle = useBaseUrl("/try/playground.bundle.js");
  const interpreter = useBaseUrl("/try/interactive_js.bc.js");
  const container = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const root = container.current;
    if (!root || started.current) return; // StrictMode runs effects twice.
    started.current = true;

    const q = <T extends Element>(sel: string) =>
      root.querySelector(sel) as T | null;
    const buttons = ["clear", "format", "execute"].map((id) =>
      q<HTMLButtonElement>(`#${id}`),
    );

    const fail = (why: string) => {
      const loading = q<HTMLElement>("[data-loading]");
      if (loading) loading.textContent = why;
    };

    // Execution has to be ordered, but the transfers do not: together these are ~9MB
    // uncompressed, and fetching the second only once the first has run doubles the wait.
    for (const [href, rel] of [
      [interpreter, "preload"],
      [bundle, "modulepreload"],
    ]) {
      const link = document.createElement("link");
      link.rel = rel;
      if (rel === "preload") link.as = "script";
      link.href = href;
      document.head.appendChild(link);
    }

    const liq = document.createElement("script");
    liq.src = interpreter;
    liq.onerror = () =>
      fail(
        "The interpreter is built by Liquidsoap’s CI and is missing from this build.",
      );
    liq.onload = () => {
      const editor = document.createElement("script");
      editor.type = "module";
      editor.src = bundle;
      editor.onerror = () =>
        fail("The editor bundle is missing from this build.");
      // interactive_js.ml puts everything -- the editor handover and the click handlers
      // for the three buttons -- behind `window.onload`. index.html gets that for free
      // from a <script> in its head; injecting after the page has loaded means the event
      // has already fired, so the handler is called once both artifacts are in place.
      editor.onload = () => window.onload?.(new Event("load"));
      document.body.appendChild(editor);
    };

    // The interpreter has to run before the editor bundle or it fails to find
    // stdlib_js.liq, which it loads from its own filesystem as it starts.
    document.body.appendChild(liq);

    // The editor replacing the textarea is what says the buttons are wired to something.
    const poll = setInterval(() => {
      if (!root.querySelector(".cm-editor")) return;
      clearInterval(poll);
      for (const b of buttons) if (b) b.disabled = false;
      q<HTMLElement>("[data-loading]")?.setAttribute("hidden", "");
      q<HTMLElement>("[data-shortcut]")?.removeAttribute("hidden");
    }, 100);

    const mac = /mac/i.test(navigator.platform);
    const mod = q<HTMLElement>("[data-mod]");
    if (mod) mod.textContent = mac ? "⌘" : "Ctrl";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (mac ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        q<HTMLButtonElement>("#execute")?.click();
      }
    };
    document.addEventListener("keydown", onKey);

    // One pane at a time on small screens. The bundle also binds these buttons; toggling
    // a class here is additive and does not fight it.
    const code = q<HTMLElement>("#code");
    const results = q<HTMLElement>("#results");
    const show = (pane: "code" | "results") => () => {
      code?.classList.toggle(styles.hiddenSmall, pane !== "code");
      results?.classList.toggle(styles.hiddenSmall, pane !== "results");
    };
    const toCode = show("code");
    const toResults = show("results");
    q<HTMLElement>("#switch-code")?.addEventListener("click", toCode);
    q<HTMLElement>("#switch-results")?.addEventListener("click", toResults);

    return () => {
      clearInterval(poll);
      document.removeEventListener("keydown", onKey);
    };
  }, [bundle, interpreter]);

  return (
    <main
      className={styles.page}
      ref={container}
      // Rendered once, then owned entirely by the scripts above.
      dangerouslySetInnerHTML={{ __html: markup(styles) }}
    />
  );
}

export default function Try(): React.ReactElement {
  return (
    <Layout
      title="Playground"
      description="Run Liquidsoap scripts in your browser. The interpreter runs locally, nothing is sent to a server."
    >
      <BrowserOnly>{() => <Playground />}</BrowserOnly>
    </Layout>
  );
}
