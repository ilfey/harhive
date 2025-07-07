import {ReactNode} from 'react';
import './BaseLayout.scss';
import {box, vstack} from 'generated/patterns';

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
        <span>
          &copy; ilfey
        </span>
      </footer>
    </div>
  );
};

const layoutChild = box({
  maxW: 1440,
  w: '100%',
  marginInline: 'auto',
});