import MeetupList from '@/components/meetups/MeetupList';
import { useEffect, useState } from 'react';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Some address 1, 1234 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Some address 2, 1234 Some City',
    description: 'This is a second meetup!',
  },
];

function HomePage() {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect works 'afer the component function executes'
  // i.e we have two component render cycle.
  // The first time this component renders, the loadedMeetups state will be
  // this initial state of an empty array.
  // What's important here is:
  // Becauise if we would fetch this from a backend, our users might see a loading
  // spinner briefly which could or could not be the user experience we wanna
  // offer. But in addition, even here where we don't really send a request and
  // where the response "arrives basically instantly" even in this case.
  // Because of this two render cycles, we have a problem with Search Engine
  // Optimization.
  // If we view the page source, we will notice that the actual meetup data is
  // missing.
  // So the items which we see on the screen, all meetups and details, they are
  // missing in the HTML content in the HTML page we fetched from the server.
  // And they are missing because they are only rendered in a second component
  // execution cycle.
  // But the pre-rendered HTML page generated by NEXTjs automatically does not
  // wait for this second cycle.
  // It always takes the result of the first render cycle and returns that as
  // the pre-rendered HTML code.
  // And there, this data (all meetups pics and details), is missing.
  // Here, with the dummy data, it is redundant to do it like this i.e inside useEffect
  // But we are basically just simulating that we do fetch this data from a server
  // And then we'll face the problem that NEXTjs does not wait for that data
  // to be fetched to then return the fully pre-rendered page.
  // But it returns the result of the first component rendered cycle.
  // And that might be a pretty empty page when we view src code!!!
  // Thankfully, NEXTjs has solution for this problem.
  // It has more core features built into NEXtjs that helps us with precisely
  // this problem, that we wanna pre-render a page with data, but with data
  // for which we have to wait. And we need to tell NEXTjs, once we're done waiting!
  useEffect(() => {
    // send a http request and fetch data
    // so some promise completed above
    // once that's done, we will set the state updating fn with meetups that we
    // fetched
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
