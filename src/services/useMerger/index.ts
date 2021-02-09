import moment from "moment";

const useMerger = (props: { setValue: Function; getValues?: Function }) => {
  const mergeProvider = (e: any, providers: any[]) => {
    const name = e?.target?.value;
    if (name !== "") {
      providers?.forEach((o) => {
        if (o.node?.name === name || o.node?.alias === name) {
          props.setValue("entry.provider.id", o.node.id);
        }
      });
    }
  };

  const mergeCategory = (e: any, categories: any[]) => {
    const value = e?.target?.value;
    if (value !== "") {
      const splitted: any[] = e?.target?.name.split(".");
      splitted.pop();
      const name = splitted.join(".");
      categories?.forEach((o) => {
        if (o.node?.value === value) {
          console.log(o.node);
          console.log(`${name}.id : ${o.node.id}`);
          return props.setValue(`${name}.id`, o.node.id);
        }
      });
    }
  };

  const parseDate = (e: any) => {
    const name = e?.target?.name;
    const value = new Date(e?.target?.value);
    props.setValue(name, moment(value).format());
  };

  return { parseDate, mergeCategory, mergeProvider };
};

export default useMerger;
