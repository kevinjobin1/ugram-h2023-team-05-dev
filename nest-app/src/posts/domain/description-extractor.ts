export function extractTags(description: string): string[] {
  return description.split(' ').filter(tag => tag.startsWith('#') && tag.length > 1).map(tag => tag.substring(1));
}

export function extractMentions(description: string): string[] {
  return description.split(' ').filter(mention => mention.startsWith('@') && mention.length > 1).map(tag => tag.substring(1));
}
