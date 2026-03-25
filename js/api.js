export async function fetchJSON(url, onRateLimit) {
  const res = await fetch(url);

  if (onRateLimit) onRateLimit(res);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Repository not found. Check owner/repo.");
    }
    if (res.status === 403) {
      throw new Error("Rate limit exceeded (60 requests/hour).");
    }
    if (res.status === 401) {
      throw new Error("Unauthorized request.");
    }
    throw new Error(`GitHub API error (${res.status})`);
  }

  return res.json();
}

export async function loadBranches(repo, onRateLimit) {
  const data = await fetchJSON(
    `https://api.github.com/repos/${repo}/branches`,
    onRateLimit
  );
  return data.map(b => b.name);
}

export async function fetchCommits(repo, branch, page = 1, onRateLimit) {
  return fetchJSON(
    `https://api.github.com/repos/${repo}/commits?sha=${branch}&per_page=100&page=${page}`,
    onRateLimit
  );
}

export async function getAllCommits(repo, branch, onRateLimit) {
  let all = [];
  let page = 1;

  while (true) {
    const data = await fetchCommits(repo, branch, page, onRateLimit);
    if (!data.length) break;
    all = all.concat(data);
    page++;
  }

  return all;
}
