export default function unwrapErrors(err) {
  if (err.extensions) {
    return unwrapErrors(err.extensions);
  }

  if (err.exception) {
    return unwrapErrors(err.exception);
  }

  if (err.errors) {
    return unwrapErrors(err.errors);
  }


  return err;
}
