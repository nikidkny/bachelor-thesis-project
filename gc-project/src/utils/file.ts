import { IMAGE_EXTENSIONS, VIDEO_EXTENSIONS } from "./mediaDetector";

/**
 * Get the extension of a file
 *
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export function getFileExtension(filename: string): string {
  const suffixes = filename.split(".").pop()?.toLowerCase();
  return suffixes?.split("/")[0] ?? "";
}
/**
 * Check if a given URL is a video
 *
 * @param {string} url - URL to check
 * @returns {boolean} True if the URL is a video, false otherwise
 */
export function isVideo(url: string): boolean {
  const extension = getFileExtension(url);
  return VIDEO_EXTENSIONS.includes(extension);
}

/**
 * Check if a given URL is an image
 *
 * @param {string} url - URL to check
 * @returns {boolean} True if the URL is an image, false otherwise
 */
export function isImage(url: string): boolean {
  const extension = getFileExtension(url);
  return IMAGE_EXTENSIONS.includes(extension);
}


/**
 * Check if an URL is a base64 URL
 *
 * @param {string} url - URL to check
 * @returns {boolean} True if the URL is a base64 URL, false otherwise
 */
export function isBase64(url: string): boolean {
  return url.startsWith("data:");
}

/**
 * Check if an URL is a blob URL
 *
 * @param {string} url - URL to check
 * @returns {boolean} True if the URL is a blob URL, false otherwise
 */
export function isBlobUrl(url: string): boolean {
  return url.startsWith("blob:");
}
