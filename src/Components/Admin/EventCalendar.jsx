
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Calendar, Trash2, Edit2 } from 'lucide-react';

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2025, 0, 25, 10, 0),
      end: new Date(2025, 0, 25, 11, 0),
    },
    {
      id: 2,
      title: 'Project Deadline',
      start: new Date(2025, 0, 28, 14, 0),
      end: new Date(2025, 0, 28, 15, 0),
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: null,
    end: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Generate calendar days
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.start >= newEvent.end) {
      alert('Start time must be before the end time.');
      return;
    }
    if (isEditing) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...newEvent, id: event.id } : event
        )
      );
      setIsEditing(false);
    } else {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    setNewEvent({ title: '', start: null, end: null });
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: event.start,
      end: event.end,
    });
    setIsEditing(true);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
        <Calendar className="mr-2" /> Event Calendar
      </h2>

      {/* Event Input Form */}
      <form onSubmit={handleAddEvent} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 border rounded"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            value={
              newEvent.start ? format(newEvent.start, "yyyy-MM-dd'T'HH:mm") : ''
            }
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, start: new Date(e.target.value) }))
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            value={
              newEvent.end ? format(newEvent.end, "yyyy-MM-dd'T'HH:mm") : ''
            }
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, end: new Date(e.target.value) }))
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Event' : 'Add Event'}
        </button>
      </form>

      {/* Calendar View */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                setCurrentDate(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                )
              }
              className="p-2 bg-gray-200 rounded"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                )
              }
              className="p-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="font-bold text-gray-600">
              {day}
            </div>
          ))}
          {calendarDays.map((day) => {
            const isToday = isSameDay(new Date(), day);
            return (
              <div
                key={day.toISOString()}
                className={`p-2 border rounded relative ${
                  day.getMonth() !== currentDate.getMonth()
                    ? 'bg-gray-100 text-gray-400'
                    : ''
                } ${isToday ? 'bg-blue-100 text-blue-800 font-bold' : ''}`}
              >
                <span className="block">{format(day, 'd')}</span>
                {events
                  .filter((event) => isSameDay(event.start, day))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="bg-blue-100 text-blue-800 text-xs p-1 mt-1 rounded cursor-pointer"
                      onClick={() => handleEditEvent(event)}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center p-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-gray-600">
                  {format(event.start, 'MMM d, yyyy h:mm a')} -{' '}
                  {format(event.end, 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditEvent(event)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventCalendar;

