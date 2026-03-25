export function format(commits, type) {
  commits.sort(
    (a, b) =>
      new Date(b.commit.author.date) - new Date(a.commit.author.date)
  );

  if (type === "json") return JSON.stringify(commits, null, 2);

  let out = "";
  for (const c of commits) {
    const date = c.commit.author.date.slice(0, 10);
    const msg = c.commit.message.split("\n")[0];
    const sha = c.sha.slice(0, 7);
    const url = c.html_url;
    const author = c.commit.author.name;

    if (type === "md") {
      out += `## ${date}\n- **${msg}**\n- ${author}\n- \`${sha}\`\n- ${url}\n\n`;
    } else {
      out += `${date} | ${msg} | ${author}\n`;
    }
  }
  return out;
}
