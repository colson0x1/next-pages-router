/* @ Static Generation */
// localhost:3000/static-generation

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
function StaticGeneration() {
  return (
    <>
      <h1 style={{ color: 'dodgerblue' }}>Static Generation</h1>

      <StaticGenerationList backendData={BACKEND_DATA} />
    </>
  );
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
