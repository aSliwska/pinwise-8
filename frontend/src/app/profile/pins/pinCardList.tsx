import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from "@/components/store";
import PinCard from 'components/PinCard';
import { fetchAllUserPins } from '../../../../logic/map/pinFetching';
import { deletePin } from '../../../../logic/profile';

const PinCardList = (email : string) => {
    const [userPins, setUserPins] = useState<{
        id: number,
        lon: number,
        lat: number,
        type: string,
        companyName: string | undefined,
        lastModificationDate: Date,
        address: string,
        service: {
          id: number,
          tagKey: string,
          tagValue: string,
          name: string,
          logo: string,
        },
        draggable: boolean,
        selected: boolean,
        inDeleteMode: boolean,
      }[]>([]);
    
      useEffect(() => {
        const token = localStorage.getItem('token');
        const [user, setUser] = useAtom(userAtom);
        const email = user.email;
        //const email = 'user@example.com'; // replace with the actual email
    
        fetchAllUserPins(email, token, setUserPins);
      }, []);


    const handleDelete = async (pinId: number) => {
        const token = localStorage.getItem('token');
        const [user, setUser] = useAtom(userAtom);
        const email = user.email;
        //const email = 'user@example.com'; // replace with the actual email
        await deletePin(email, token, pinId);
        
        setUserPins((prevPins) => prevPins.filter(pin => pin.id !== pinId));
    };
  
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ height: '500px', overflowY: 'auto', width: '320px', padding: '10px', borderRadius: '5px', scrollbarWidth: 'none' }}>
                {userPins.map(pin => (
                <PinCard
                    id={pin.id}
                    logoUrl={pin.service.logo}
                    title={pin.companyName}
                    type={pin.type}
                    address={pin.address}
                    date_added={pin.lastModificationDate}
                    onDelete={deletePin}
                />
                ))}
            </div>
        </div>
    );
  };
  
  export default PinCardList;