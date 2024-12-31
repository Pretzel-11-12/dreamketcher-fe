import { _Model as Model } from './model';

export namespace fetchCreator {
  export async function postWebtoon(arg: {
    title: string;
    thumbnail: string;
    prologue: string;
    story: string;
    description: string;
    genre: string;
  }): Promise<Model.ResPostWebtoon> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/webtoons`,
      {
        method: 'POST',
        body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to post webtoons`);
    return response.json();
  }
}
