// root page
// This index.jsx will be server if a request reaches our domain slash nothing
// For Example: our-domain.com/

// What it goes in these page files is, our standard React Component, the React
// component that should be loaded for that specific page.
// We must export this component so that NEXT js is able to find it
// SIDE NOTE: The reason we don't have `import React from 'react'` is, NEXTjs
// projects support this modern React setup where we can omit this import and
// it's added behind the scenes, so to say.
function HomePage() {
  return <h1>The Home Page</h1>;
}

export default HomePage;
