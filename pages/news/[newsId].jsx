// our-domain.com/news/dynamic-path
/*
 * If we have square barackets in our file name like this, this tells
 * NEXT js that this will be a dynamic page. So it shoul dbe loaded for
 * different values in our path.
 */

import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();

  // newsId is the identifier that we wrote between [] i.e [newsId]
  // we see two logs on the console
  // undefined and then the actual path
  // That's because how useRouter works. It runs immediately when the pages first
  // rendered and at this point it doesn't yet know what's in the URL but then once
  // we have that information, the component renders again and we got that
  // concrete value. That is just how that hook works!:w
  // console.log(router.query.newsId);

  const newsId = router.query.newsId;

  // If we have a API, we could send a request to the backend API
  // to fetch the news item with newsId

  return <h1>The Detail Page</h1>;
}

export default DetailPage;
