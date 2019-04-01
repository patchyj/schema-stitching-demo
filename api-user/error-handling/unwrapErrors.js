export default function unwrapErrors(err) {
  if (err.originalError) {
    return unwrapErrors(err.originalError);
  }

  if (err.extensions) {
      console.log(err);
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
