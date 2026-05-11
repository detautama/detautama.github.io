import { Metadata } from "next";
import { activities } from "@/app/(clean-layout)/activity/activityData";
import { ActivityCard } from "@/app/(clean-layout)/activity/ActivityCard";

export const metadata: Metadata = {
  title: "Activity - I Putu Deta Utama Putra",
  description:
    "A personal activity and bookmark archive — things I explore, tools I use, and projects I follow.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Activity</h1>
      <div className="mb-5" />
      <p>
        A personal feed of things I find interesting, tools I explore, and
        projects I follow.
      </p>
      <div className="mb-5" />
      {activities.length === 0 ? (
        <div className="py-16 text-center text-brand-text-secondary dark:text-brand-dark-text/50">
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
