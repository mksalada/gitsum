export function setLoading(outputEl) {
  outputEl.innerHTML = `<div class="placeholder fade-in">⏳ Fetching...</div>`;
}

export function setError(outputEl, msg) {
  outputEl.innerHTML = `<div class="placeholder fade-in">❌ ${msg}</div>`;
}

export function setOutput(outputEl, text) {
  outputEl.innerHTML = `<pre class="fade-in">${text}</pre>`;
}

export function populateBranches(select, branches) {
  select.innerHTML = "";
  branches.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    select.appendChild(opt);
  });

  if (branches.length > 0) select.value = branches[0];
}
