// This special component acts as the root component NEXTjs will render.
// It receives props and uses object destructuring here to pull information
// out of the props and the information it pull out there is a component prop
// and a page prop.
// These props are passed into the App component automatically by NEXTjs
// since NEXTjs is the thing using that specific component.
// `Component` is a prop that holds the actual page contents that should be
// rendered. So it will be different whenever we swithc a page.
// `pageProps` are specific props our pages might be getting!
// At the moment our pages are not getting any props at all because at the moment
// we have no source that would provide such props.
// But that is something we're going to change
// Hence, Component here in this `_app.jsx` file will in the end be the actual
// page content of our different pages.
// And it will change whenever we navigate from page A to page B.
// Now since that's the case, we can utilize this `_app.jsx` file and simply
// wrap this component here with our layout or with whichever wrapper we have.
// And then we don't have to do it inside of our different page files.
// So we can remove the layout wrapper from index.js from our homepage.
// And then here, we import Layout and wrap this component here with the
// layout component.
// And that means our different page contents will be wrapped with this layout
// component.
// Now in all the pages, we get this layout and we don't need to wrap it around
// the different page contents inside of the different page files.
// Hence, Therefore this way is more maintainable and convenient approach of
// applying general components to our application!
// So whenever we have some setting that affects all our pages, we can utilize
// this `_app.jsx` file to easily add that without diving into dozens of files
// individually!!

import Layout from '@/components/layout/Layout';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
