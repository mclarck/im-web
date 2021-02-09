const useSanitizer = () => {
   const sanitize = (obj: any) => {
    let finalObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === "object") {
        const nestedObj = sanitize(obj[key]);
        if (Object.keys(nestedObj).length) {
          finalObj[key] = nestedObj;
        }
      } else if (
        obj[key] !== "" &&
        obj[key] !== undefined &&
        obj[key] !== null
      ) {
        finalObj[key] = obj[key];
      }
    });
    return finalObj;
  };
  return { sanitize };
};

export default useSanitizer;
