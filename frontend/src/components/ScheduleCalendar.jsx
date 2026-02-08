import Calendar from 'react-calendar';
import { useState } from 'react';
import { scheduleVideo } from '../../api/apiService';
import { toast } from 'react-toastify';

const ScheduleCalendar = ({ videoId }) => {
  const [date, setDate] = useState(new Date());

  const handleSchedule = async () => {
    try {
      await scheduleVideo({ videoId, schedule: date });
      toast.success('Video scheduled');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <button onClick={handleSchedule} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">
        Schedule Video
      </button>
    </div>
  );
};

export default ScheduleCalendar;
