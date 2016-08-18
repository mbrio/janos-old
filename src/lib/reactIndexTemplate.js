/**
 * Creates an string representation of a base React HTML template.
 *
 * We use module.exports here to ensure we can use this within the webpack config files.
 *
 * @param  {string} htmlAttributes - Any attributes to be placed within the <html> tag
 * @param  {string} title - The <title> tag associated with the page
 * @param  {string} meta - Any <meta> tags associated with the page
 * @param  {string} link - Any <link> tags associated with the page
 * @param  {string} reactComponent - The rendered React component
 * @return {string} - The generated HTML content
 */
module.exports = function reactIndexTemplate(htmlAttributes, title, meta, link, reactComponent) {
  return `
    <!DOCTYPE html>
    <html ${htmlAttributes}>
      <head>
        <meta charset="utf-8">
        ${title}
        ${meta}
        ${link}
      </head>
      <body>
        <div id="react-view">${reactComponent}</div>
        <script src="/build/js/app.js"></script>
      </body>
    </html>
  `;
};
