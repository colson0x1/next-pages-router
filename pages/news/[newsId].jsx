// our-domain.com/news/dynamic-path
/*
 * If we have square barackets in our file name like this, this tells
 * NEXT js that this will be a dynamic page. So it shoul dbe loaded for
 * different values in our path.
 */

function DetailPage() {
  return <h1>The Detail Page</h1>;
}

export default DetailPage;
