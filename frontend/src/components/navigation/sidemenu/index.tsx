import { Switch, Input, Tabs, Select, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CloseOutlined } from '@ant-design/icons';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { showExistingLocationsOnMapAtom, showUserPinsOnMapAtom, isMapSidemenuOpenAtom, userAtom, showHeatmapAtom, timePeriodForPinDisplayAtom, isServicesSearchOpenAtom } from '@/components/store';
import { handleCompanySearch } from '@/logic/map/existingLocationFetching';
import { fetchAllServiceTypes } from '@/logic/map/pinFetching';
import ImageWithDefault from '@/components/imageWithDefault';

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
  const [company, _] = useState<{
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }>(JSON.parse(localStorage.getItem('searchedCompany')!)); 
  const user = useAtomValue(userAtom);
  const [showExistingLocationsOnMap, setShowExistingLocationsOnMap] = useAtom(showExistingLocationsOnMapAtom);
  const [showHeatmap, setShowHeatmap] = useAtom(showHeatmapAtom);
  const [showUserPinsOnMap, setShowUserPinsOnMap] = useAtom(showUserPinsOnMapAtom);
  const setTimePeriodForPinDisplay = useSetAtom(timePeriodForPinDisplayAtom);

  return (
    <>
      <div className='flex flex-col p-6 gap-3'>
        <span className='text-neutral-200'>
          Wyświetlasz:
        </span>
        <div className='flex flex-row p-3 gap-4 rounded-lg border border-neutral-600 items-center color-bg-gradient-gray-fade text-neutral-200 w-full'>
          <ImageWithDefault
            className="relative p-1"
            style={{'filter': 'invert(85%) sepia(87%) saturate(35%) hue-rotate(166deg) brightness(112%) contrast(80%)'}}
            src={company.service.logo}
            alt="company logo or service icon"
            width={32}
            height={32}
            priority
            defaultSrc='/service_icons/default.svg'
          />
          <div className='flex flex-col gap-[2px]'>
            {(company.type == "company") ? (
              <>
                {company.companyName}
                <span className='text-xs text-neutral-500'>
                  {company.service.name}
                </span>
              </>
            ) : (
              <>{company.service.name}</>
            )}
          </div>
          
          <Link href='/map' className='flex ml-auto text-neutral-500 text-2xl'>
            <CloseOutlined/>
          </Link>
        </div>
        <div className='flex flex-row justify-between items-center mt-3'>
          <span className='text-neutral-200'>Wyświetl dane:</span>
            <Select defaultValue={'-1'} onChange={(newVal) => setTimePeriodForPinDisplay(newVal)} 
              placement="bottomRight" popupMatchSelectWidth={false}
              options={[
                { value: '604800000', label: 'Z tego tygodnia' },
                { value: '2628002880', label: 'Z tego miesiąca' },
                { value: '7884008640', label: 'Z ostatnich 3 miesięcy' },
                { value: '15768000000', label: 'Z ostatnich 6 miesięcy' },
                { value: '31536000000', label: 'Z ostatnich 12 miesięcy' },
                { value: '-1', label: 'Wszystkie' }
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
          <Switch checked={showHeatmap} onChange={() => {
            setShowHeatmap(!showHeatmap);
          }}/>
          <div className='text-neutral-200'>Pokaż mapę cieplną zainteresowania</div>
        </div>

        {user.isAuthenticated ? (
          <>
            <div className="flex flex-row gap-3 items-center">
              <Switch checked={showUserPinsOnMap} onChange={() => {
                setShowUserPinsOnMap(!showUserPinsOnMap);
              }}/>
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
  const [services, setServices] = useState<{
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[]>([]);
  const [companies, setCompanies] = useState<{
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[]>([]);
  const user = useAtomValue(userAtom);
  const [isServicesSearchOpen, setIsServicesSearchOpen] = useAtom(isServicesSearchOpenAtom);
  const [showUserPinsOnMap, setShowUserPinsOnMap] = useAtom(showUserPinsOnMapAtom);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllServiceTypes(setServices);
  }, [form]);

  const getFilteredServices = useCallback((substr: string) => {
    return (services.length < 1 || substr == null) ? 
      services :
      services.filter((s) => s.service.name.toLowerCase().includes((substr + "").trim().toLowerCase()))
  }, [services]);

  return (
    <>
      <div className="flex flex-row p-6 gap-3 items-center">
        {user.isAuthenticated ? (
          <>
            <Switch checked={showUserPinsOnMap} onChange={() => {
              setShowUserPinsOnMap(!showUserPinsOnMap);
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
                if (services !== null) {
                  handleCompanySearch(form.getFieldValue([['search']]), setCompanies, services);
                }
              }}
            />
          </Form.Item>

          <Tabs 
            id='tab' 
            activeKey={(isServicesSearchOpen) ? "2" : "1"}
            onTabClick={(key) => {setIsServicesSearchOpen(key == "2")}}
          >
            <Tabs.TabPane 
              tab="Firmy" 
              key="1"
              className='h-[63vh]'
            >
              <CompaniesList companies={companies}/>
            </Tabs.TabPane>
            <Tabs.TabPane 
              tab="Usługi" 
              key="2"
              className='h-[63vh]'
            >
              <CompaniesList companies={ getFilteredServices(form.getFieldValue([['search']])) }/>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </div>
    </>
  );
}

function CompaniesList(props: {
  companies: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[];
}) {
  const setSearchedCompany = useCallback((searchedCompany: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }) => {
    localStorage.setItem('searchedCompany', JSON.stringify(searchedCompany));
  }, []); 
  
  return (
    <ul className='flex flex-col divide-y divide-neutral-600 overflow-y-auto max-h-full'>
      {props.companies.map(company => (
        <li key={(company.type == "company") ? company.service.id + company.companyName! : company.service.id}>
          <Link 
            href={"/map/heatmap"} 
            className="flex flex-row gap-3 items-center p-3 text-neutral-200 hover:bg-neutral-600 transition-all hover:text-neutral-200"
            onClick={() => setSearchedCompany(company)}
          >
            <ImageWithDefault
              className="relative p-1"
              style={{'filter': 'invert(85%) sepia(87%) saturate(35%) hue-rotate(166deg) brightness(112%) contrast(80%)'}}
              src={company.service.logo}
              alt="company logo or service icon"
              width={32}
              height={32}
              priority
              defaultSrc='/service_icons/default.svg'
            />
            <div className='flex flex-col gap-[2px]'>
              {(company.type == "company") ? (
                <>
                  {company.companyName}
                  <span className='text-xs text-neutral-500'>
                    {company.service.name}
                  </span>
                </>
              ) : (
                <>{company.service.name}</>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}