import { CarFrontIcon, HomeIcon, HourglassIcon, IdCardIcon, VerifiedIcon } from 'lucide-react';
import { useState } from 'react';

const urbanist = {
  fontFamily: 'Urbanist',
};

export default function EligibilitySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const criteria = [
    {
      title: 'Reside in Ondo State',
      icon: <HomeIcon color='white' />,
      description: 'Your residency in Ondo State is a requirement for joining the movement.',
    },
    {
      title: 'Possess a valid voter’s card',
      icon: <IdCardIcon color='white' />,
      description: 'Ensure you have a valid voter’s card to exercise your voting rights.',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 flex flex-col justify-center items-center gap-10">
      <div className="h-28 flex flex-col justify-start items-center gap-2.5">
        <div className="self-stretch text-center text-black text-2xl font-semibold capitalize">
          What do you need to join The Lucky Guy movement?
        </div>
        <div className="w-full text-center text-sm font-medium capitalize">
          Explore the eligibility criteria for joining The Lucky Guy movement.
        </div>
      </div>
      <div className="p-10 bg-[#f8f7f7] rounded-md w-full flex justify-center items-center">
        <div className="flex flex-col justify-start items-center gap-10 w-full">
          <div className="self-stretch text-center text-base font-semibold capitalize">
            To be eligible to join TLG, users must;
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {criteria.map((criterion, index) => (
              <div
                key={index}
                className="bg-white rounded-md p-5 flex flex-col justify-center items-start gap-2.5"
              >
                <div className="p-[5px] bg-[#1277dd] rounded flex justify-start items-center gap-2.5">
                  {criterion.icon}
                </div>
                <div className="text-[#1a1a1a] text-sm font-medium capitalize">
                  {criterion.title}
                  {isExpanded && (
                    <p className="mt-2 text-xs text-gray-600">{criterion.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 text-sm font-medium underline"
          >
            {isExpanded ? 'Show less' : 'Learn more'}
          </button>
        </div>
      </div>
    </div>
  );
}