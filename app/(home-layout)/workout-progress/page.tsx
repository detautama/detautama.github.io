import { ChestPull } from "./ChestPull";
import { DumbbellCurl5Kg } from "./DumbbellCurl5Kg";
import { HandGrip5Kg } from "./HandGrip5Kg";
import { KneelingPushup } from "./KneelingPushup";
import { Pushup } from "./Pushup";
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
      <div className="mb-10" />
      <DumbbellCurl5Kg />
      <div className="mb-10" />
      <HandGrip5Kg />
      <div className="mb-10" />
      <Pushup />
    </div>
  );
}
