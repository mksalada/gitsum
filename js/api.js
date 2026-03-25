export async function fetchJSON(url) {
  const res = await fetch(url);
  updateRateLimit(res);
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export async function loadBranches(repo) {
  const data = await fetchJSON(`https://api.github.com/repos/${repo}/branches`);
  return data.map(b => b.name);
}

export async function fetchCommits(repo, branch, page = 1) {
  return fetchJSON(
    `https://api.github.com/repos/${repo}/commits?sha=${branch}&per_page=100&page=${page}`
  );
}

export async function getAllCommits(repo, branch) {
  let all = [], page = 1;
  while (true) {
    const data = await fetchCommits(repo, branch, page);
    if (!data.length) break;
    all = all.concat(data);
    page++;
  }
  return all;
}
