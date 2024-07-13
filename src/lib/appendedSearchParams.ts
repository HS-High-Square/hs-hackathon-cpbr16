export default function appendedSearchParams(
  append?: { name: string; value: string }[]
) {
  const url = new URL(document.location.toString());
  if (append?.forEach) {
    append.forEach((a) => {
      url.searchParams.append(a.name, a.value);
    });
  }
  return url.searchParams ? `?${url.searchParams.toString()}` : ``;
}
