import { Metadata } from "next";
import { activities } from "./activityData";
import { ActivityCard } from "./ActivityCard";

export const metadata: Metadata = {
  title: "Activity - I Putu Deta Utama Putra",
  description:
    "A personal activity and bookmark archive — things I explore, tools I use, and projects I follow.",
};

export default function Page() {
  return (
    <div>
      <span className="hud-label">Activity stream</span>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.06em]">
        Activity
      </h1>
      <div className="mb-5" />
      <p>
        A personal feed of things I find interesting, tools I explore, and
        projects I follow.
      </p>
      <div className="mb-5" />
      {activities.length === 0 ? (
        <div className="dark:text-brand-dark-text/50 py-16 text-center text-brand-text-secondary">
          <p>No activities yet. Check back soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
