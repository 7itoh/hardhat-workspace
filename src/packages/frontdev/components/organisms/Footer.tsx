import { VFC} from "react";

interface FOOTERPROPS {
  label: string,
}

export const Footer: VFC<FOOTERPROPS> = ({
  label,
}) => {
  return (
    <>
      <footer>
        <p>{ label }</p>
      </footer>
    </>
  );
}