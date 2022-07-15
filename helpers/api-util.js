export async function getAllEvents() {
  const response = await fetch('https://events-management-85647-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
  const data = await response.json();
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getAllComments() {
  const response = await fetch('https://events-management-85647-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json');
  const data = await response.json();
  const comments = [];

  // convert data to array of objects and store in comments
  for (const key in data) {
    comments.push({
      id: key,
      ...data[key]
    });
  }
  return comments;
}

export async function filteredComments(eventId) {
  const allComments = await getAllComments();
  // filter allComments and return only comments for eventId and write each comment to console.log
  // allComments.forEach((comment) => console.log(comment));

  const filteredComments = allComments.filter((comment) => comment.eventId === eventId);
  // console.log(filteredComments)
  return filteredComments;

}