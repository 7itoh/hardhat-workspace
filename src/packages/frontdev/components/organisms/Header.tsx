import { VFC } from "react";
import Link from 'next/link';

interface HEADERPROPS {
  label: string
}

export const Header: VFC<HEADERPROPS> = ({
  label,
}) => {
  return (
    <>
      <header>
          <nav>
            <Link href="/">
              <a>
                <h1>{ label }</h1>
              </a>
            </Link>
          </nav>
      </header>
    </>
  );
}