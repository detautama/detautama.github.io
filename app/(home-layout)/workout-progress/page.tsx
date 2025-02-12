import { ChestPull } from "./ChestPull";
import { KneelingPushup } from "./KneelingPushup";
import { Squat } from "./Squat";

export default function Page() {
  return (
    <div>
      <h3 className="text-center text-2xl font-bold">Workout Progress</h3>
      <div className="mb-10" />
      <ChestPull />
      <div className="mb-10" />
      <Squat />
      <div className="mb-10" />
      <KneelingPushup />
    </div>
  );
}
