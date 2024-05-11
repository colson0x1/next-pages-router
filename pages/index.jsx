// root page
// This index.jsx will be server if a request reaches our domain slash nothing
// For Example: our-domain.com/

import Link from 'next/link';
import { Fragment } from 'react';

// What it goes in these page files is, our standard React Component, the React
// component that should be loaded for that specific page.
// We must export this component so that NEXT js is able to find it
// SIDE NOTE: The reason we don't have `import React from 'react'` is, NEXTjs
// projects support this modern React setup where we can omit this import and
// it's added behind the scenes, so to say.
function HomePage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href='/news/nextjs-is-a-great-framework'>
            NEXTjs is A Great Framework
          </Link>
        </li>
        <li>
          <Link href='/news/silicon-valley'>Silicon Valley</Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default HomePage;
