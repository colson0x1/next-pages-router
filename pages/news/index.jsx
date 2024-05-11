// index.jsx is exception for root path
// So this `news.jsx`, the content in here, the React component in here would
// be serverd for requests to our domain slash news
// For Example: our-domain.com/news

function NewsPage() {
  return <h1>The News Page</h1>;
}

export default NewsPage;
