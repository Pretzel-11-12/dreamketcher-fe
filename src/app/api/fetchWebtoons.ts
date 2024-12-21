export async function fetchWebtoons() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/webtoons`,
    {
      method: "GET",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch webtoons.");
  return response.json();
}

export async function fetchWebtoonsByGenre(genre: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/webtoons/genre/${genre}`,
    {
      method: "GET",
    }
  );
  if (!response.ok)
    throw new Error(`Failed to fetch webtoons for genre: ${genre}`);
  return response.json();
}

export async function fetchWebtoonDetails(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/webtoons/${id}`,
    {
      method: "GET",
    }
  );
  if (!response.ok)
    throw new Error(`Failed to fetch details for webtoon: ${id}`);
  return response.json();
}
