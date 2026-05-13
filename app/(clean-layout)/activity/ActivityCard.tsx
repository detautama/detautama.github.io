import Link from "next/link";
import { Activity } from "./activityData";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <article className="brand-card group flex flex-col gap-3 p-6 hover:translate-y-[-2px]">
      <h2 className="font-semibold text-brand-text-primary dark:text-brand-dark-text">
        {activity.title}
      </h2>
      <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/70">
        {activity.summary}
      </p>
      <div>
        <Link
          href={activity.link}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-button-primary text-sm"
        >
          Visit →
        </Link>
      </div>
    </article>
  );
};
