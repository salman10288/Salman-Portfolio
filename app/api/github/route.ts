import { NextResponse } from "next/server";

import type { GitHubResponse } from "@/types";

export const runtime = "nodejs";
export const revalidate = 3600;

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepository {
  stargazers_count: number;
  fork: boolean;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    commits?: Array<unknown>;
  };
}

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "salman-3d-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function lastTwelveWeeks(events: GitHubEvent[]) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const days = Array.from({ length: 84 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (83 - index));
    return { date: date.toISOString().slice(0, 10), count: 0 };
  });

  const byDate = new Map(days.map((day) => [day.date, day]));

  for (const event of events) {
    const date = event.created_at?.slice(0, 10);
    const day = byDate.get(date);
    if (!day) continue;

    const contributionCount =
      event.type === "PushEvent"
        ? Math.max(1, event.payload?.commits?.length ?? 0)
        : event.type === "PullRequestEvent" || event.type === "IssuesEvent" || event.type === "CreateEvent"
          ? 1
          : 0;

    day.count += contributionCount;
  }

  return days;
}

async function readGitHub<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME?.trim();

  if (!username) {
    const payload: GitHubResponse = {
      configured: false,
      message: "Add GITHUB_USERNAME to .env.local to display verified public activity.",
    };
    return NextResponse.json(payload);
  }

  try {
    const encodedUsername = encodeURIComponent(username);
    const [user, repositories, events] = await Promise.all([
      readGitHub<GitHubUser>(`https://api.github.com/users/${encodedUsername}`),
      readGitHub<GitHubRepository[]>(
        `https://api.github.com/users/${encodedUsername}/repos?per_page=100&sort=updated`,
      ),
      readGitHub<GitHubEvent[]>(
        `https://api.github.com/users/${encodedUsername}/events/public?per_page=100`,
      ),
    ]);

    const stars = repositories
      .filter((repository) => !repository.fork)
      .reduce((total, repository) => total + repository.stargazers_count, 0);
    const recentCommits = events
      .filter((event) => event.type === "PushEvent")
      .reduce((total, event) => total + (event.payload?.commits?.length ?? 0), 0);

    const payload: GitHubResponse = {
      configured: true,
      username: user.login,
      profileUrl: user.html_url,
      avatarUrl: user.avatar_url,
      stats: {
        repositories: user.public_repos,
        recentCommits,
        stars,
        followers: user.followers,
      },
      activity: lastTwelveWeeks(events),
    };

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "GitHub activity could not be loaded.";
    return NextResponse.json(
      {
        configured: false,
        message: `${message} Check the configured username or token.`,
      } satisfies GitHubResponse,
      { status: 502 },
    );
  }
}
