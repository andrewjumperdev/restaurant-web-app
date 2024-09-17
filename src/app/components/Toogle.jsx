"use client";

export default function Toggle({ isOn, setIsOn }) {

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  console.log(isOn)

  return (
    <div className="flex items-center mx-2">
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        checked={isOn}
        onChange={handleToggle}
      />
      <label htmlFor="toggle" className="cursor-pointer">
        <div
          className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${
            isOn ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
              isOn ? 'translate-x-6' : ''
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}
