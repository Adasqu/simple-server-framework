export default function responsError(error, res) {
  console.log(error);
  let errorResponse;
  if (typeof error === "string") errorResponse = simplError(error);
  else errorResponse = extendedError(error);
  res.status(errorResponse.code);
  res.send({ status: "Error", data: errorResponse.message });
}
function simplError(error) {
  switch (error) {
    case "Not found":
      return { code: 404, message: error };

    default:
      return { code: 501, message: "Unknown error: " + error };
  }
}
function extendedError(error) {
  console.log(error["errors"][0]["message"]);
  switch (error["errors"][0]["message"]) {
    case "email must be unique":
      return { code: 403, message: "email must be unique" };

    default:
      return { code: 501, message: "Unknown error: " + error };
  }
}
