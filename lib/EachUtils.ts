import { Children } from "react";

const EachUtils = <T>({
  of,
  render,
}: {
  of: [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (item: T, index: number) => any;
}) => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default EachUtils;
