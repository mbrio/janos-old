/**
 * Generates a string to be used as a constant identifier.
 *
 * @param {string} pkg - The package the constant belongs to
 * @param {string} namespace - The namespace within the package the constant belongs to
 * @param {string} name - The name of the constant
 * @return {string} - The constant (e.g. @@pkg/namespace/name)
 */
export default function constant(pkg, namespace, name) {
  return `@@${pkg}/${namespace}/${name}`;
}
