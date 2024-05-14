// our-domain.com/new-meetup

import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    // console.log(enteredMeetupData);
    // Here it will be an internal API which will be hosted by the same server
    // as is being used for serving this page.
    // And therefore, we just can construct a absolute path here to send a request
    // to the same server but a different path on that server.
    // And the path is /api because it's this special API folder and then the
    // file name.
    // This will now send a request to this new-meetup JS file in the API folder.
    // And it will then trigger that function for us. NEXTjs will trigger that
    // function for us when a request reaches this path.
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Eventually we then get a response and we can then get data from that response
    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
