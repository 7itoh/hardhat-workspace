import { VFC } from "react";
import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'

export type HOMEPROPS = {
  children: React.ReactNode;
};

export const HomeLayout: VFC<HOMEPROPS> = ({ children }) => {
  return (
    <div>
      <Header label="KSC MAKER" />
      <hr />
        <main>
          { children }
      </main>
      <hr />
      <Footer label="beehach.com" />
    </div>
  );
}