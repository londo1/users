import { useContext, useEffect, useState } from "react";
import { MessageApiContext } from "../../../App";

export const useGetRequest = (url: string, errorMessage?: string) => {
  const messageApi = useContext(MessageApiContext);
  const [promise, setPromise] = useState<Promise<any>>(new Promise(() => {}));

  useEffect(() => {
    setPromise(
      fetch(url)
        .then((response) => response.json())
        .catch(() => {
          messageApi.open({
            type: "error",
            content: errorMessage || "Whoops, there was an error",
          });
        }),
    );
  }, []);

  return promise;
};
