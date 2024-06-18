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
    onDelete: (id : number) => Promise<void>;
  }

const PinCard = ({ id, logoUrl, title, type, address, date_added, onDelete } : PinCardProps) => {
  const router = useRouter();
  console.log(title);
  return (
    <div className='bg-gray-600 rounded-lg shadow-lg mb-3'>
    <Card className="rounded-lg shadow-lg"
       style={{ backgroundColor: '#545454', borderColor: '#5c5c5c', color: 'white'}}> 
      <div className="flex items-center mb-4">
        <img src={logoUrl} alt={title} className="w-10 h-10 mr-2" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="mb-4">
        <p>Typ: {type}</p>
        <p>Miejsce: {address}</p>
        <p>Dodano: {date_added.toLocaleDateString()}</p>
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
          onClick={()=>{onDelete(id);}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3 6l3 18h12l3-18h-18zm14 16h-10l-2.5-15h15l-2.5 15zm-8-11v8h2v-8h-2zm4 0v8h2v-8h-2zm2-11v1h-6v-1h-5v3h16v-3h-5z"/>
        </svg>
        </button>
      </div>
    </Card>
    </div>
  );
};

export default PinCard;