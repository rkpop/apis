import Axios from "axios";

const get = async (url: string): Promise<string | undefined> => {
  const response = await Axios.get(url);
  if (response.status == 404) {
    return undefined;
  }
  return response.data;
};

export { get };
