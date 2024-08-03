export function formatDateWithoutSeconds(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(['en-us'], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}