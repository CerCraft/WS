import { Network, Data, Node, Edge } from "vis-network/standalone";

const categoryColors: Record<string, string> = {
  ads: "#ef4444",
  analytics: "#3b82f6",
  social: "#a855f7",
};

let startTime = Date.now();

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  const domainEl = document.getElementById("domain") as HTMLElement;
  try {
    domainEl.textContent = new URL(tab.url ?? "").hostname;
  } catch {
    domainEl.textContent = "—";
  }

  const trackers = (await chrome.runtime.sendMessage({ type: "GET_TRACKERS" })) ?? [];
  document.getElementById("count")!.textContent = String(trackers.length);
  document.getElementById("list-count")!.textContent = String(trackers.length);

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.querySelectorAll("a[href^='http']").length,
    });
    document.getElementById("links")!.textContent = String(result);
  } catch {
    document.getElementById("links")!.textContent = "—";
  }

  renderList(trackers);
  renderGraph(trackers, tab.url ?? "");
  startUptime();
}

function renderList(trackers: any[]) {
  const ul = document.getElementById("trackers-list")!;
  if (!trackers.length) {
    ul.innerHTML = `<li class="empty">NO ENTITIES DETECTED</li>`;
    return;
  }
  ul.innerHTML = trackers
    .map((t) => `
      <li>
        <span class="name">${t.name}</span>
        <span class="cat ${t.category}">${t.category.toUpperCase()}</span>
      </li>`)
    .join("");
}

function renderGraph(trackers: any[], pageUrl: string) {
  let pageHost = "unknown";
  try {
    pageHost = new URL(pageUrl).hostname;
  } catch {}

  const nodes: Node[] = [{
    id: "page",
    label: pageHost,
    color: { background: "#131820", border: "#f59e0b", highlight: { background: "#131820", border: "#f59e0b" } },
    size: 28,
    font: { color: "#f59e0b", size: 11, face: "JetBrains Mono" },
    shape: "box",
    borderWidth: 2,
  }];
  
  const edges: Edge[] = [];

  trackers.forEach((t, i) => {
    const color = categoryColors[t.category] ?? "#6b7280";
    nodes.push({
      id: `t_${i}`,
      label: t.name,
      color: { background: "#131820", border: color },
      size: 14,
      font: { color: "#e5e7eb", size: 9, face: "JetBrains Mono" },
      shape: "dot",
      borderWidth: 2,
    });
    edges.push({
      from: "page",
      to: `t_${i}`,
      color: { color: color + "66" },
      width: 1,
      dashes: true,
    });
  });

  const container = document.getElementById("graph")!;
  const data: Data = { nodes, edges };
  
  new Network(container, data, {
    physics: {
      enabled: true,
      barnesHut: { gravitationalConstant: -4000, springLength: 100 },
      stabilization: { iterations: 100 },
    },
    interaction: { dragNodes: true, zoomView: true, dragView: true, hover: true },
    layout: { improvedLayout: trackers.length < 50 },
  });
}

function startUptime() {
  const el = document.getElementById("time")!;
  setInterval(() => {
    const s = Math.floor((Date.now() - startTime) / 1000);
    el.textContent = s < 60 ? `${s}s` : `${Math.floor(s / 60)}m`;
  }, 1000);
}

init();