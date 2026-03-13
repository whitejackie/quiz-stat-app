function Feedback({ score, feedback }) {
  let message;

  if (score === 100) message = feedback.perfect;
  else if (score >= 75) message = feedback.high;
  else if (score > 40) message = feedback.medium;
  else message = feedback.low;

  return (
    <div className="flex flex-col items-center">
      <p>Said {score} punkti 100-st</p>
      <p className="font-bold text-center">{message}</p>
    </div>
  );
}

export default Feedback;
