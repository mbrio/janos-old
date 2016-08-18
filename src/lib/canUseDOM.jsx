/* global window */

/**
 * Helps determine if we can render to a DOM, if not then we are rendering on the server.
 */
export default function canUseDOM() {
  return (typeof window !== 'undefined' && window.document && window.document.createElement);
}
