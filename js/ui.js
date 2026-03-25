export function setLoading(el) {
  el.innerHTML = `<div class="placeholder">⏳ Fetching...</div>`;
}

export function setError(el, msg) {
  el.innerHTML = `<div class="placeholder">❌ ${msg}</div>`;
}

export function setOutput(el, text) {
  el.innerHTML = `<pre>${text}</pre>`;
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
