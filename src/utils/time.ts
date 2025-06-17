export function formatDateToDMY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0"); // 01–31
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 01–12
  const year = date.getFullYear(); // 2025

  return `${day}/${month}/${year}`;
}
