import { Bell } from "lucide-react";
import { formatDate } from "../../utils/formatDate.js";

export default function NotificationTable({ events }) {
  return (
    <section className="event-feed">
      {events.map((event, index) => (
        <article className="event-row" key={`${event.type}-${index}`}>
          <Bell size={18} />
          <div>
            <strong>{event.type}</strong>
            <span>{event.message}</span>
          </div>
          <time>{formatDate(event.time)}</time>
        </article>
      ))}
    </section>
  );
}
