export function formatDate(stringDate: string) {
  const date = new Date(stringDate);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatPostDate(stringDate: string) {
  const timeElapsedInSeconds = Math.floor(
    (new Date().getTime() - new Date(stringDate).getTime()) / 1000,
  );
  switch (true) {
    case timeElapsedInSeconds >= 86400:
      return `${Math.floor(timeElapsedInSeconds / 86400)}d`;
    case timeElapsedInSeconds >= 3600:
      return `${Math.floor(timeElapsedInSeconds / 3600)}h`;
    case timeElapsedInSeconds >= 60:
      return `${Math.floor(timeElapsedInSeconds / 60)}m`;
    case timeElapsedInSeconds == 0:
      return 'now';
    default:
      return `${Math.floor(timeElapsedInSeconds)}s`;
  }
}
