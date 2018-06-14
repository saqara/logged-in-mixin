/**
 * @summary LoggedIn mixin for ValidatedQuery
 * @locus Server
 * @export
 * @mixin LoggedInMixin
 * @param {Object} methodOptions
 * @param {Function|String} [methodOptions.loggedInError]
 * @return {*}
 * @throws {TypeError}
 */
export default function LoggedInMixin (methodOptions) {
  const options = { ...methodOptions }
  const { loggedInError = 'User not logged.' } = options

  if (typeof loggedInError !== 'string' && typeof loggedInError !== 'function') {
    throw new TypeError('LoggedInMixin: `loggedInError` must be a function or a string.')
  }

  const originalRun = options.run

  options.run = function permissionsMixin (...cbArgs) {
    if (this.userId) {
      return originalRun.call(this, ...cbArgs)
    }

    if (typeof loggedInError === 'function') {
      throw loggedInError.call(this, ...cbArgs)
    } else {
      throw new Error(loggedInError)
    }
  }
  return options
}
