import MeetupDetail from '@/components/meetups/MeetupDetail';
import { Fragment } from 'react';

function MeetupDetails() {
  return (
    <MeetupDetail
      image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153'
      alt='A First Meetup'
      address='Some Street 5, Some City'
      description='This is a first meetup'
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

  return {
    props: {
      meetupData: {
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
        id: meetupId,
        title: 'A First Meetup',
        address: 'Some Street 5, Some City',
        description: 'This is a first meetup',
      },
    },
  };
}

export default MeetupDetails;
