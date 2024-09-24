
document.addEventListener('DOMContentLoaded', function() {
  updateTimeZones();
  setInterval(updateTimeZones, 1000);

  const meetingForm = document.getElementById('meeting-form');
  const meetingList = document.getElementById('meeting-list');

  let meetings = JSON.parse(localStorage.getItem('meetings')) || [];

  meetingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const meetingId = document.getElementById('meeting-id').value;
    const meetingPassword = document.getElementById('meeting-password').value;
    const meetingTime = document.getElementById('meeting-time').value;

    const newMeeting = {
      id: meetingId,
      password: meetingPassword,
      time: meetingTime
    };

    meetings.push(newMeeting);
    localStorage.setItem('meetings', JSON.stringify(meetings));
    displayMeetings();
    meetingForm.reset();
  });

  function displayMeetings() {
    meetingList.innerHTML = '';
    meetings.forEach((meeting, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${meeting.id} - ${meeting.time}</span>
        <div>
          <button onclick="editMeeting(${index})">Edit</button>
          <button onclick="deleteMeeting(${index})">Delete</button>
        </div>
      `;
      meetingList.appendChild(li);
    });
  }

  window.deleteMeeting = function(index) {
    meetings.splice(index, 1);
    localStorage.setItem('meetings', JSON.stringify(meetings));
    displayMeetings();
  };

  window.editMeeting = function(index) {
    const meeting = meetings[index];
    document.getElementById('meeting-id').value = meeting.id;
    document.getElementById('meeting-password').value = meeting.password;
    document.getElementById('meeting-time').value = meeting.time;
    deleteMeeting(index);
  };

  displayMeetings();
});

function updateTimeZones() {
  const usTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York", timeStyle: "short" });
  const indiaTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", timeStyle: "short" });
  const dubaiTime = new Date().toLocaleString("en-DU", { timeZone: "Asia/Dubai", timeStyle: "short" });
  const ukTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/London", timeStyle: "short" });

  document.getElementById('us-time').textContent = `US Time: ${usTime}`;
  document.getElementById('india-time').textContent = `India Time: ${indiaTime}`;
  document.getElementById('dubai-time').textContent = `Dubai Time: ${dubaiTime}`;
  document.getElementById('uk-time').textContent = `UK Time: ${ukTime}`;
}
