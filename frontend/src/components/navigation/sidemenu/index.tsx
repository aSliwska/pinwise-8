import { Switch, Input, Tabs, Select, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CloseOutlined } from '@ant-design/icons';
import { useAtom, useAtomValue } from 'jotai';
import { showExistingLocationsOnMapAtom, showAllUserPinsOnMapAtom, isMapSidemenuOpenAtom, userAtom } from '@/components/store';
import { handleCompanySearch, handleServiceSearch } from '@/logic/map/existingLocationFetching';

async function fetchAllUserPins() {
  // todo: implement fetch request
}

async function fetchCompanies(substring: string) {
  
}

async function fetchServices(substring: string) {
  // todo: database fetch
}

async function showUserPins() {
  alert("show user pins");
  // todo: show user pins 
}

async function showExistingLocations() {
  alert("show pins from google");
  // todo: show pins from google
}

async function showHeatmap() {
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
  const [service, _] = useState<{
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }>(JSON.parse(localStorage.getItem('searchedService')!)); 
  const user = useAtomValue(userAtom);
  const [showExistingLocationsOnMap, setShowExistingLocationsOnMap] = useAtom(showExistingLocationsOnMapAtom);
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
          <div className='flex flex-col gap-[2px]'>
            {service.name}
            <span className='text-xs text-neutral-500'>
              {service.tagKey + '=' + service.tagValue} {/* todo: change to fetched service display name */}
            </span>
          </div>
          
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
          <Switch checked={showExistingLocationsOnMap} onChange={() => {
              setShowExistingLocationsOnMap(!showExistingLocationsOnMap);
            }}/>
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
  const [companies, setCompanies] = useState<{
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }[]>([]);
  const [services, setServices] = useState<{
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }[]>([]);
  const user = useAtomValue(userAtom);
  const [showAllUserPinsOnMap, setShowAllUserPinsOnMap] = useAtom(showAllUserPinsOnMapAtom);
  const [form] = Form.useForm();

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
        <Form form={form}>
          <Form.Item name='search'>
            <Input
              placeholder="Szukaj..." 
              prefix={<SearchOutlined className='text-xl' style={{color: '#a3a3a3'}}/>} 
              style={{paddingInlineStart: 12, gap: 8}}
              onPressEnter={(event) => {
                event.preventDefault();
                handleCompanySearch(form.getFieldValue([['search']]), setCompanies);
                handleServiceSearch(form.getFieldValue([['search']]), setServices);
              }}
            />
          </Form.Item>

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
        </Form>
      </div>
    </>
  );
}

function ServicesList(props: {
  services: {
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }[];
}) {
  const setSearchedService = useCallback((searchedService: {
    tagKey: string;
    tagValue: string;
    name: string;
    logo: string;
  }) => {
    localStorage.setItem('searchedService', JSON.stringify(searchedService));
  }, []); 
  
  return (
    <ul className='flex flex-col divide-y divide-neutral-600 overflow-y-auto max-h-full'>
      {props.services.map(service => (
        <li key={service.name + '-' + service.tagKey + '-' + service.tagValue}>
          <Link 
            href={"/map/heatmap"} 
            className="flex flex-row gap-3 items-center p-3 text-neutral-200 hover:bg-neutral-600 transition-all hover:text-neutral-200"
            onClick={() => setSearchedService(service)}
          >
            <Image
              className="relative"
              src={service.logo}
              alt="company logo or service icon"
              width={40}
              height={40}
              priority
            />
            <div className='flex flex-col gap-[2px]'>
              {service.name}
              <span className='text-xs text-neutral-500'>
                {service.tagKey + '=' + service.tagValue} {/* todo: change to fetched service display name */}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}