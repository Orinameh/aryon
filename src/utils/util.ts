/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildQuery = (data: any) => {
    if (typeof data === "string") return data;
  
    const query = [];
  
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (data[key] !== undefined && data[key] !== "" && data[key] !== null) {
          query.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
          );
        }
      }
    }
    return query.join("&");
  };