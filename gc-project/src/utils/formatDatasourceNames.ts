export function formatDatasourceNames(datasource: string) {
  return (
    datasource
      //split at hyphens
      .split("-")
      // lowercase all words
      .map((word) => word.toLowerCase())
      // replace "and" with "&"
      .map((word) => (word === "and" ? "&" : word))
      // capitalize first letter of each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // join words with spaces
      .join(" ")
  );
}
