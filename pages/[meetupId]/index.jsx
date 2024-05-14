import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '@/components/meetups/MeetupDetail';
import { Fragment } from 'react';

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      alt={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

// getStaticProps or getSeverSideProps here?
// It depends on how often our data changes and if we need access to the
// request object.

// When used `context` parameter in `getStaticProps`, context will not hold
// request and response, but it will, for example, have a `params` key.
// And that will be a object where our identifiers between the [] i.e [meetupId]
// will be properties and the values will be the actual values encoded in the URL.
//
export async function getStaticProps(context) {
  // Fetch data for a single meetup

  // meetupId because that's the identifer we have inside square brackets
  // i.e [meetupId]
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  const client = await MongoClient.connect(
    'mongodb+srv://colson:startup2025@cluster0.h31egms.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0',
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  // access a single meetup
  // findOne() finds one single document
  // And to findOne(), we need to pass an object where we define how to filter,
  // how to search for that document.
  // On this object, we can pass our field names, like title, image, address,
  // or description as keys and then the values for which we wanna search as values.
  // convert string meetupId into such mongodb ObjectId
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      // prevent serialization error by making sure that we convert this _id field,
      // back to a string
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

// `getStaticPaths` is another function NEXTjs understands just like getStaticProps
// and getServerSideProps. And `getStaticPaths` is a fn we need to export in a
// page component file if it's a dynamic page and we're using `getStaticProps`!!
// Not if we're using `getServerSideProps` and not if we're using neither
// `getStaticProps` nor `getServerSideProps` but it is needed if we do use
// `getStaticProps`
// This can also be a async fn so that we can use async await in here.
// With getStaticProps, a page is pre-generated during the build process.
// This means that of course, NEXTjs needs to pre-generate all versions of this
// dynamic page in advance, for all the supported IDs.
// Because since this is dynamic, NEXTjs needs to know for which ID values it
// should pre-generate the page.
// We get the ID from the URL.
// But this is not pre-generated when user visits this page with a specific value
// in the URL, but during the build process.
// So here we need to pre-generate for all the URLs, for all the meetupId values
// users might be entering at runtime.
// And if they enter an ID for which we didn't pre-generate the page, they will
// see a 404 Error.
// But because that is how it works, we need to add getStaticPaths, which has
// the job of returning an object where we describe all the dynamic segment values.
// So all the meetupIDs in this case, for which this page should be pre-generated.
// Now for this, this object needs to have a paths key, which is an array and
// in that array, we must have multiple objects one object per version of this
// dynamic page where this object has a params key which then itself is an object,
// with all the key value pairs that might lead to our dynamic page.
// So if we have multiple dynamic segments, then we would have multiple keys in this
// nested object.
// Here we only have meetupID as a single dynamic segment. And hence in this params object,
// we would add a meetupID key and then enter a concrete value for meetupID
// for which this page should be pre-generated!
// And if we have multiple possible values like in this case we have m1 and m2,
// we would return a paths awaay with two objectgs inside of it, where the other
// one uses m2 as a meetupID.
// In reality we would not hardcode this as a developer, but we would
// also fetch our supported IDs from a database or from an API and generate this
// array dynamically.

// Another piece of configuration  which we need to add in this returned object
// next to our paths key is: `fallback` key.
// This key tells NEXTjs whether our paths array contains all supported parameter
// values or just some of them.
// If we set fallback to `false`, we say that our paths contains all supported
// meetupId values. That means that if the user enters anything that's not supported
// here, for example, 'm3', they will see 404 Error.
// If we set fallback to `true` on the other hand, NEXTjs would try to generate
// a page for this meetupID dynamically on the server for the incoming request.
// Fallback is a nice feature because it allows us to pre-generate some of our pages
// for specific meetupId values.
// For example the pages which are visited most frequently and then pre-generate
// the msising ones dynamically when requests for them are coming in.
// Here we're setting up fallback to false to indicate that we defined all
// supported paths here.
// The general concept is that we can simiply define some paths instead of all
// paths. If we for example, have hundreds of pages and we don't wanna pre-generate
// all fo them, but maybe just our most popular pages.

// Hence, `getStaticProps` therefore is another important function, which we
// need in dynamic pages to tell NEXTjs for which dynamic parameter values
// this page should be pre-generated!!
// And then again, getStaticProps executs for every page. So for every meetupId
// value allows us to fetch data for that meetup and allows us to return props
// for that meetup.
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://colson:startup2025@cluster0.h31egms.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0',
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  // get all the meetups data
  // find() gives us access to all the meetups
  // adding filter criteria to get only id
  // We do want to find all here so an empty object as the first argument, which
  // means give us all the objects.
  // We have no filter criteria.
  // But then we can pass a second argument where we can define which fields should
  // be extracted for every document.
  // And by default, all the fields will be returned.
  // So all the field values title, image and so on.
  // But if we're only interested in the ID, we can also add _id here and set
  // this to one. which means only include the ID but no other field values.
  // But with that, we're only fetching the IDs.
  // So we fetched document objects, but they each will only contain the ID,
  // nothing else.
  // Again we should call toArray() here to convert this to a JS array of objects.
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    // Generate array of paths dynamically
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export default MeetupDetails;
