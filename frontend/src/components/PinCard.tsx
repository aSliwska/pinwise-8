"use client";

import { Card } from 'antd';
import { useRouter } from "next/navigation";

interface PinCardProps {
    id : number;
    logoUrl: string | undefined;
    title: string | undefined;
    type: string | undefined;
    address: string | undefined;
    date_added: Date;
    onDelete: (email : string, token : string | null, id : number) => Promise<void>;
    
    // async () => {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/deletePin`, {
    //     method: "DELETE",
    //     headers: {'Authorization': `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    // };
    //onEdit: () => void;
  }

const PinCard = ({ logoUrl, title, type, address, date_added, onDelete } : PinCardProps) => {
  const router = useRouter();
  return (
    <div className='bg-gray-600 rounded-lg shadow-lg mb-3'>
    <Card className="rounded-lg shadow-lg"
       style={{ backgroundColor: '#545454', borderColor: '#5c5c5c', color: 'white'}}> 
      <div className="flex items-center mb-4">
        <img src={logoUrl} alt={title} className="w-10 h-10 mr-2" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="mb-4">
        <p>{type}</p>
        <p>{address}</p>
        <p>{date_added.toLocaleDateString()}</p>
      </div>

      <div className="flex justify-between">
      <button
          className="bg-btn text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={()=>{router.push('/map');}}
        >
          Pokaż na mapie
        </button>
        <button
          className="text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={()=>{onDelete}}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      {/* <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-t-lg">
        <h2 className="text-center font-bold">{title}</h2>
      </div>
      <div className="p-4">
        <p>{type}</p>
        <p>{address}</p>
        <p>{date_added}</p>
      </div> */}
    </Card>
    </div>
  );
};

export default PinCard;