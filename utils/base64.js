export function encodeBase64(text) {
  try {
    if (typeof window === 'undefined') {
      return Buffer.from(text, 'utf-8').toString('base64');
    } else {
      return btoa(
        encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode('0x' + p1)
        )
      );
    }
  } catch {
    return '';
  }
}

export function decodeBase64(base64) {
  try {
    if (typeof window === 'undefined') {
      return Buffer.from(base64, 'base64').toString('utf-8');
    } else {
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    }
  } catch {
    return '';
  }
}
