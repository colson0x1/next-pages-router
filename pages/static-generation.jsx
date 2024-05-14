/* @ Static Generation */
// localhost:3000/static-generation

// Two forms of Pre-Rendering:
// @ Static Generation
// @ Server Side Rendering

// static generation:
// In static generation, page component is pre-rendered when we build it for
// production!

import { useEffect, useState } from 'react';

// @ Moke Database
// Simulation of DATA we get on the BACKEND
const BACKEND_DATA = [
  {
    id: 1,
    name: 'NEXT.js',
  },
  {
    id: 2,
    name: 'Remix',
  },
  {
    id: 3,
    name: 'Angular',
  },
];

// Main Component (Parent)
// Prerendering
// Now data is not fetched in a second component render cycle on the client
// but initially, before this page is pre-rendered during the build process
// using getStaticProps!
function StaticGeneration(props) {
  // We no longer need to manage state, we no longer need useEffect because
  // now BACKEND_DATA will be prepared and loaded in getStaticProps

  return (
    <>
      <h1 style={{ color: 'dodgerblue' }}>Static Generation</h1>

      <StaticGenerationList backendData={props.meetups} />
    </>
  );
}

// By default, NEXTjs prepares/generates our page statically during the build process.
// If we need to wait for data, if we need to add data fetching to a page component,
// we can do so by exporting a special function from inside our page component file
// called `getStaticProps`
// NOTE: This works only in component files inside of the `pages` folder!

// We can return a `Promise` here
// NEXTjs will wait for this promise to resolve which means it waits until
// our data is loaded
// And then we return the props for this component function!
// With that we're able to load data before our component function is executed
// so this above component can be rendered with the required data.

// on getStaticProps, we can execute any code that normally only run on a server.
// Like accessing file system here, or securely connect to a database.
// Because Anycode we write here, will never end up on the client side i.e it will
// never execute on the client side simply because this code is executed
// during the build process. Not on the server and especially not on the clients
// of our visitors. So the code here will never reach the machines of our visitors.
// It will never execute on their machines.

// Inside getStaticProps, we can fetch data from an API or read data from a
// database or read data from some files in the file system like that
// But then once we're done with whatever we did to get the data we need,
// We need to return an object here in getStaticProps!
// We always need to return an object here!!

// This is how we can move the data fetching away from the client to the
// server side or to be precise to the during the build process side!
// Now on page source, we no longer have empty unordered list!!
export async function getStaticProps() {
  // Fetch data from an API

  return {
    props: {
      meetups: BACKEND_DATA,
    },
  };
}

export default StaticGeneration;

// Child Component that renders framework in a list
function StaticGenerationList({ backendData }) {
  return (
    <>
      <div style={{ color: 'red', fontSize: '33px' }}>
        <ul>
          {backendData.map((framework) => (
            <li key={framework.id}>{framework.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
