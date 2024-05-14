/* @ Server Side Rendering (SSR) */
// localhost:3000/server-side-rendering

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
function StaticGeneration(props) {
  // We no longer need to manage state, we no longer need useEffect because
  // now BACKEND_DATA will be prepared and loaded in getServerSideProps

  return (
    <>
      <h1 style={{ color: 'dodgerblue' }}>Static Generation</h1>

      <StaticGenerationList backendData={props.meetups} />
    </>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

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
