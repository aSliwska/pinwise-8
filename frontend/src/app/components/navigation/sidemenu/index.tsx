import { Switch, Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export async function handleSearch(event: React.FormEvent) {
  event.preventDefault();
  // alert("Search");
  // todo: implement search
}

export async function showUserPins() {
  alert("show user pins");
  // todo: show user pins 
}

export default function SideMenu(props: { 
  isOpen: boolean; 
}) {
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
      },{
          id: 3,
          name: "Firma 0",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 4,
          name: "Firma 1",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 5,
          name: "Firma 2",
          logo: "/temp_rectangle.svg"
      },{
          id: 6,
          name: "Firma 0",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 7,
          name: "Firma 1",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 8,
          name: "Firma 2",
          logo: "/temp_rectangle.svg"
      },{
          id: 9,
          name: "Firma 0",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 10,
          name: "Firma 1",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 11,
          name: "Firma 2",
          logo: "/temp_rectangle.svg"
      },{
          id: 12,
          name: "Firma 0",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 13,
          name: "Firma 1",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 14,
          name: "Firma 2",
          logo: "/temp_rectangle.svg"
      },{
        id: 15,
        name: "Firma 0",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 16,
        name: "Firma 1",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 17,
        name: "Firma 2",
        logo: "/temp_rectangle.svg"
    },{
        id: 18,
        name: "Firma 0",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 19,
        name: "Firma 1",
        logo: "/temp_rectangle.svg"
    },
    {
        id: 20,
        name: "Firma 2",
        logo: "/temp_rectangle.svg"
    },
  ]);
  const [services, setServices] = useState([
      {
          id: 0,
          name: "Usługa 0",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 1,
          name: "Usługa 1",
          logo: "/temp_rectangle.svg"
      },
      {
          id: 2,
          name: "Usługa 2",
          logo: "/temp_rectangle.svg"
      },
  ]); // TODO: fetch companies and services

  return ( // todo: logged out user appearance
    <div className={(props.isOpen? "" : "-translate-x-full") + " transition-transform duration-200 w-96 h-full absolute z-0 color-bg-gradient-dark-gray divide-y divide-neutral-600 overflow-hidden"}>
      
      <div className="flex flex-row pt-[72px] p-6 gap-3 items-center">
        <Switch defaultChecked onChange={showUserPins}/>
        <div className='text-neutral-200'>Pokaż moje pineski</div>
      </div>

      <div className="flex flex-col p-6 gap-3 ">
        <div className='text-neutral-200'>Wybierz firmę/usługę:</div>
        <form onChange={handleSearch}>
          <Input 
            id="search" 
            className='text-neutral-600 text-xl px-3 py-4 gap-2' 
            placeholder="Szukaj..." 
            prefix={<SearchOutlined className='text-neutral-400 text-xl'/>} 
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
              <ul className='flex flex-col divide-y divide-neutral-600 overflow-y-auto max-h-full'>
                {companies.map(company => (
                  <li key={company.id}>
                    <Link 
                      href={"/company/" + company.id} 
                      className="flex flex-row gap-3 items-center p-3 hover:bg-neutral-600 transition-all hover:text-neutral-200"
                    >
                      <Image
                        className="relative"
                        src={company.logo}
                        alt="company logo"
                        width={40}
                        height={40}
                        priority
                      />
                      {company.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Tabs.TabPane>
            <Tabs.TabPane 
              tab="Usługi" 
              key="2"
              className='h-[66.3vh]'
            >
              <ul className='flex flex-col divide-y divide-neutral-600 overflow-y-auto max-h-full'>
                {services.map(service => (
                  <li key={service.id}>
                    <Link 
                      href={"/service/" + service.id} 
                      className="flex flex-row gap-3 items-center p-3 hover:bg-neutral-600 transition-all hover:text-neutral-200"
                    >
                      <Image
                        className="relative"
                        src={service.logo}
                        alt="service icon"
                        width={40}
                        height={40}
                        priority
                      />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Tabs.TabPane>
          </Tabs>
        </form>
      </div>
        
    </div>
  );
}