import { Switch, Input, Tabs, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CloseOutlined } from '@ant-design/icons';
import { useAtom, useAtomValue } from 'jotai';
import { isMapSidemenuOpenAtom, showAllUserPinsOnMapAtom, userAtom } from '@/components/store';

export async function handleSearch(event: React.FormEvent) {
  event.preventDefault();
  // alert("Search");
  // todo: implement search
}

export async function showUserPins() {
  alert("show user pins");
  // todo: show user pins 
}

export async function showExistingLocations() {
  alert("show pins from google");
  // todo: show pins from google
}

export async function showHeatmap() {
  alert("show heatmap");
  // todo: show heatmap
}

export default function SideMenu() {
  const pathname = usePathname();
  const isMapSidemenuOpen = useAtomValue(isMapSidemenuOpenAtom);

  return (
    <div className={(isMapSidemenuOpen? "" : "-translate-x-full") + " transition-transform duration-200 w-[400px] h-full pt-12 -translate-y-[48px] absolute z-[1] color-bg-gradient-dark-gray divide-y divide-neutral-600 overflow-hidden"}>
      {pathname == "/map" ? (<SearchMenu/>) : (<HeatmapMenu/>)}
    </div>
  );
}

function HeatmapMenu() {
  const [service, setService] = useState({
    id: 0,
    name: "Firma 0",
    logo: "/temp_rectangle.svg"
  });
  const user = useAtomValue(userAtom);
  const handleTimePeriodChange = (value: string) => {
    alert("time period change");
    // todo: fetch filtered data
  };

  return (
    <>
      <div className='flex flex-col p-6 gap-3'>
        <span className='text-neutral-200'>
          Wyświetlasz:
        </span>
        <div className='flex flex-row p-3 gap-4 rounded-lg border border-neutral-600 items-center color-bg-gradient-gray-fade text-neutral-200 w-full'>
          <Image
            className="relative"
            src={service.logo}
            alt="company logo or service icon"
            width={40}
            height={40}
            priority
          />
          {service.name}
          
          <Link href='/map' className='flex ml-auto text-neutral-500 text-2xl'>
            <CloseOutlined/>
          </Link>
        </div>
        <div className='flex flex-row justify-between items-center mt-3'>
          <span className='text-neutral-200'>Wyświetl dane:</span>
            <Select defaultValue='5' onChange={handleTimePeriodChange} 
              placement="bottomRight" popupMatchSelectWidth={false}
              options={[
                { value: '0', label: 'Z tego tygodnia' },
                { value: '1', label: 'Z tego miesiąca' },
                { value: '2', label: 'Z ostatnich 3 miesięcy' },
                { value: '3', label: 'Z ostatnich 6 miesięcy' },
                { value: '4', label: 'Z tego roku' },
                { value: '5', label: 'Wszystkie' }
            ]}/>
        </div>
      </div>

      <div className='flex flex-col p-6 gap-6'>
        <div className="flex flex-row gap-3 items-center">
          <Switch onChange={showExistingLocations}/>
          <div className='text-neutral-200'>Pokaż istniejące lokacje</div>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <Switch defaultChecked onChange={showHeatmap}/>
          <div className='text-neutral-200'>Pokaż mapę cieplną zainteresowania</div>
        </div>

        {user.isAuthenticated ? (
          <>
            <div className="flex flex-row gap-3 items-center">
              <Switch onChange={showUserPins}/>
              <div className='text-neutral-200'>Pokaż moje pineski</div>
            </div>
            <span className='text-neutral-400'>Kliknij na mapę, aby dodać nową pineskę.</span>
          </>
        ) : (
          <span className='text-neutral-400'>
            Zaloguj się, aby wyświetlić swoje pineski.
          </span>
        )}
      </div>
    </>
  );
}

function SearchMenu() {
  const [companies, setCompanies] = useState([
    {
        id: 0,
        name: "Firma 0",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 1,
        name: "Firma 1",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 2,
        name: "Firma 2",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 3,
        name: "Firma 3",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 4,
        name: "Firma 4",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 5,
        name: "Firma 5",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 6,
        name: "Firma 6",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 7,
        name: "Firma 7",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 8,
        name: "Firma 8",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 9,
        name: "Firma 9",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 10,
        name: "Firma 10",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 11,
        name: "Firma 11",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 12,
        name: "Firma 12",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 13,
        name: "Firma 13",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 14,
        name: "Firma 14",
        logo: "/temp_rectangle.svg"
    },
    {
      id: 15,
      name: "Firma 15",
      logo: "/temp_rectangle.svg"
    },
    {
        id: 16,
        name: "Firma 16",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 17,
        name: "Firma 17",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 18,
        name: "Firma 18",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 19,
        name: "Firma 19",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 20,
        name: "Firma 20",
        logo: "/temp_rectangle.svg"
    },
  ]);
  const [services, setServices] = useState([
    {
      id: 21,
      name: "Usługa 0",
      logo: "/temp_rectangle.svg"
    },
    {
      id: 22,
      name: "Usługa 1",
      logo: "/temp_rectangle.svg"
    },
    {
      id: 23,
      name: "Usługa 2",
      logo: "/temp_rectangle.svg"
    },
  ]); // TODO: fetch companies and services
  const user = useAtomValue(userAtom);
  const [showAllUserPinsOnMap, setShowAllUserPinsOnMap] = useAtom(showAllUserPinsOnMapAtom);

  return (
    <>
      <div className="flex flex-row p-6 gap-3 items-center">
        {user.isAuthenticated ? (
          <>
            <Switch checked={showAllUserPinsOnMap} onChange={() => {
              // await showAllUserPins();
              setShowAllUserPinsOnMap(!showAllUserPinsOnMap);
            }}/>
            <div className='text-neutral-200'>Pokaż moje pineski</div>
          </>
        ) : (
          <span className='text-neutral-400'>
            Zaloguj się, aby wyświetlić swoje pineski.
          </span>
        )}
      </div>

      <div className="flex flex-col p-6 gap-3 ">
        <div className='text-neutral-200'>Wybierz firmę/usługę:</div>
        <form>
          <Input 
            id="search" 
            placeholder="Szukaj..." 
            prefix={<SearchOutlined className='text-xl' style={{color: '#a3a3a3'}}/>} 
            style={{paddingInlineStart: 12, gap: 8}}
            onChange={handleSearch}
          />

          <Tabs 
            id='tab' 
            defaultActiveKey="1"
          >
            <Tabs.TabPane 
              tab="Firmy" 
              key="1"
              className='h-[66.3vh]'
            >
              <ServicesList services={companies}/>
            </Tabs.TabPane>
            <Tabs.TabPane 
              tab="Usługi" 
              key="2"
              className='h-[66.3vh]'
            >
              <ServicesList services={services}/>
            </Tabs.TabPane>
          </Tabs>
        </form>
      </div>
    </>
  );
}

function ServicesList(props: {
  services: {
    id: number,
    name: string,
    logo: string
  }[];
}) {
  return (
    <ul className='flex flex-col divide-y divide-neutral-600 overflow-y-auto max-h-full'>
      {props.services.map(service => (
        <li key={service.id}>
          <Link 
            href={"/map/" + service.id} 
            className="flex flex-row gap-3 items-center p-3 text-neutral-200 hover:bg-neutral-600 transition-all hover:text-neutral-200"
          >
            <Image
              className="relative"
              src={service.logo}
              alt="company logo or service icon"
              width={40}
              height={40}
              priority
            />
            {service.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}