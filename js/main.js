import { loadBranches, getAllCommits } from "./api.js";
import { setLoading, setError, setOutput, populateBranches } from "./ui.js";
import { format } from "./formatter.js";

const repoInput = document.getElementById("repo");
const branchSelect = document.getElementById("branch");
const outputEl = document.getElementById("output");
const formatSelect = document.getElementById("format");

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
  const html = document.documentElement;
  const dark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", dark ? "light" : "dark");
};

// Load branches when repo input loses focus
repoInput.addEventListener("blur", async () => {
  const repo = repoInput.value.trim();
  if (!repo) return;

  try {
    const branches = await loadBranches(repo);
    populateBranches(branchSelect, branches);
  } catch {
    // silently ignore
  }
});

// Generate
document.getElementById("generate").onclick = async () => {
  const repo = repoInput.value.trim();
  const branch = branchSelect.value;
  const type = formatSelect.value;

  if (!repo) return;

  setLoading(outputEl);

  try {
    const commits = await getAllCommits(repo, branch);
    const result = format(commits, type);
    setOutput(outputEl, result);
  } catch (err) {
    setError(outputEl, err.message);
  }
};

// Download
document.getElementById("download").onclick = () => {
  const text = outputEl.innerText;
  const type = formatSelect.value;

  const blob = new Blob([text]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `COMMITS.${type}`;
  a.click();
};
