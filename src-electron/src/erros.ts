async function handleErrors(isError: boolean): Promise<string> {
  if (isError) return Promise.reject("Ocorreu uma falha");

  return Promise.resolve("Succeso");
}

export { handleErrors };
