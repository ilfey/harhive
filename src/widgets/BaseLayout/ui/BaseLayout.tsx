import {box, vstack} from "generated/patterns";
import {ReactNode} from 'react';
import './BaseLayout.scss';

type BaseLayoutProps = {
  children?: ReactNode;
}

export const BaseLayout = ({children}: BaseLayoutProps): any => {
  return (
    <div
      className={
        vstack({
          alignItems: 'center',
        })
      }
    >
      <header className={layoutChild}>

      </header>

      <main className={layoutChild}>
        {children}
      </main>

      <footer className={layoutChild}>

      </footer>
    </div>
  );
};

const layoutChild = box({
  maxW: 1440,
  w: '100%',
  marginInline: 'auto',
});