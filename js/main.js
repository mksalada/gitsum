import { loadBranches, getAllCommits } from "./api.js";
import { setLoading, setError, setOutput, populateBranches } from "./ui.js";
import { format } from "./formatter.js";

const repoInput = document.getElementById("repo");
const branchSelect = document.getElementById("branch");
const outputEl = document.getElementById("output");
const formatSelect = document.getElementById("format");

function updateRateLimit(res) {
  const box = document.getElementById("rateLimitBox");
  const r = parseInt(res.headers.get("X-RateLimit-Remaining") || "0");
  const limit = res.headers.get("X-RateLimit-Limit") || "?";

  box.classList.remove("warning", "danger");

  if (r <= 0) {
    box.classList.add("danger");
    box.innerHTML = `🚫 Rate limit exceeded (${limit}/hour)`;
  } else if (r <= 5) {
    box.classList.add("warning");
    box.innerHTML = `⚠️ Low quota: ${r}/${limit}`;
  } else {
    box.innerHTML = `ℹ️ ${r}/${limit} requests remaining`;
  }
}

document.getElementById("themeToggle").onclick = () => {
  const html = document.documentElement;
  const dark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", dark ? "light" : "dark");
};

repoInput.addEventListener("blur", async () => {
  const repo = repoInput.value.trim();
  if (!repo) return;

  try {
    const branches = await loadBranches(repo, updateRateLimit);
    populateBranches(branchSelect, branches);
  } catch (err) {
    setError(outputEl, err.message);
  }
});

document.getElementById("generate").onclick = async () => {
  const repo = repoInput.value.trim();
  const branch = branchSelect.value;
  const type = formatSelect.value;

  if (!repo) {
    setError(outputEl, "Enter a repository first.");
    return;
  }

  if (!branch) {
    try {
      const branches = await loadBranches(repo, updateRateLimit);
      populateBranches(branchSelect, branches);
    } catch (err) {
      setError(outputEl, err.message);
      return;
    }
  }

  setLoading(outputEl);

  try {
    const commits = await getAllCommits(repo, branchSelect.value, updateRateLimit);
    const result = format(commits, type);
    setOutput(outputEl, result);
  } catch (err) {
    setError(outputEl, err.message);
  }
};

document.getElementById("download").onclick = () => {
  const text = outputEl.textContent;
  const type = formatSelect.value;

  if (!text.trim()) return;

  let mime = "text/plain";
  let extension = "txt";

  if (type === "md") {
    mime = "text/markdown";
    extension = "md";
  } else if (type === "json") {
    mime = "application/json";
    extension = "json";
  }

  const blob = new Blob([text], { type: mime });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `COMMITS.${extension}`;
  a.click();

  URL.revokeObjectURL(a.href);
};
