export const PUT = (url: string, data: unknown) =>
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());

export const DELETE = (url: string) =>
  fetch(url, {
    method: "DELETE",
  });
