const COLOR = "#C0B9B1";

export function PlantDecoration() {
  return (
    <div style={{ position: "absolute", right: 50, bottom: -30, display: "flex" }}>
      <div style={{ position: "relative", display: "flex", width: 130, height: 240 }}>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 62,
            width: 6,
            height: 210,
            background: COLOR,
            borderRadius: "3px 3px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            width: 70,
            height: 34,
            background: COLOR,
            borderRadius: "0 60% 60% 60%",
            transform: "rotate(-30deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 65,
            width: 68,
            height: 32,
            background: COLOR,
            borderRadius: "60% 0 60% 60%",
            transform: "rotate(30deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 5,
            width: 62,
            height: 30,
            background: COLOR,
            borderRadius: "0 60% 60% 60%",
            transform: "rotate(-22deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 65,
            width: 60,
            height: 28,
            background: COLOR,
            borderRadius: "60% 0 60% 60%",
            transform: "rotate(22deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 165,
            left: 10,
            width: 55,
            height: 26,
            background: COLOR,
            borderRadius: "0 60% 60% 60%",
            transform: "rotate(-15deg)",
          }}
        />
      </div>
    </div>
  );
}
