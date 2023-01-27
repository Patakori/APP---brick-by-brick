import React, { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Click me
      </button>
      <div
        className={`${isOpen ? 'h-[100px] w-[100px]' : 'h-[50px] w-[100px]'} bg-slate-600 flex transition-all duration-1000 ease-in-out`}/>
    </div>
  );
}

export default Example;
