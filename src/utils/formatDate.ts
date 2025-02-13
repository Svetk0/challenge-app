export function formatDate(dateString: string, includeYear = true) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }); // Получаем сокращенное название месяца

  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  if (includeYear) {
    const year = date.getFullYear();
    return `${day}${suffix} ${month}, ${year}`;
  } else {
    return `${day}${suffix} ${month}`;
  }
}
