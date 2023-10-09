const { useEffect, useState } = require("react");

const ChooseDateInterval = ({ timestamp }) => {
  const [kValues, setKValues] = useState();

  useEffect(() => {
    fetch("./kp.json")
      .then((res) => res.json())
      .then(setKValues);
  }, []);

  const getK = (timestamp) => {
    if (!kValues) return;

    return kValues[timestamp];
  };
  return (
    <div className="absolute z-10 text-[#5a5757] right-0 mr-8 mt-8 flex flex-col items-end">
      <a href="/date" className="hover:cursor-pointer text-2xl mb-2">
        Choose Date
      </a>
      <span>{timestamp}</span>
      <span>K: {getK(timestamp)}</span>
    </div>
  );
};

export default ChooseDateInterval;
