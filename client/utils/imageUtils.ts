export function normalizeImageUrl(url: string): string {
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  }