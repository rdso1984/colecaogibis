import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

type ItemProps = {
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}

export function Item({
  description,
  author,
  children,
}: ItemProps) {
  return (
    <div
      className={cx(
        'object'
      )}
    >
      <p>{description}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}