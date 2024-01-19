export const truncateDescription = (description: string, maxLength: number): string => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '... ';
  }
  return description;
};

export const removeHashtagsFromDescription = (description: string): string => {
  return description.replace(/#(\w+)/g, '');
};

export const isValidUUID = (id: string) => {
  const pattern = new RegExp(
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$',
  );
  return pattern.test(id);
};
