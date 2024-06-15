import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSetAtom } from "jotai";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { isMapSidemenuOpenAtom, isServicesSearchOpenAtom } from "../store";
import { usePathname } from "next/navigation";
import Link from "next/link";



export default function SiteTour(props: {
  setShowTour: Dispatch<SetStateAction<boolean>>,
}) {
  const path = usePathname();
  const [tourProgress, setTourProgress] = useState((path == '/map') ? 0 : 3);
  const [tourHidden, setTourHidden] = useState(false);

  useEffect(() => {
    if (path == '/map/heatmap') {
      setTourHidden(false);
    }
  }, [path]);

  return (
    <>
      {!tourHidden && <>
        <div className='absolute top-0 w-full h-full bg-black opacity-50 z-20'/>
          <div className='absolute top-0 w-full h-full flex justify-center items-center z-30'>
          {(tourProgress == 0) && <TourWelcome setShowTour={props.setShowTour} setTourProgress={setTourProgress}/>}
          {(tourProgress == 1) && <TourFirstBubble setTourProgress={setTourProgress}/>}
          {(tourProgress == 2) && <TourSecondBubble setTourHidden={setTourHidden} setTourProgress={setTourProgress}/>}
          {(tourProgress == 3) && <TourThirdBubble setShowTour={props.setShowTour} setTourProgress={setTourProgress}/>}
        </div>
      </>}
    </>
  );
}

export function TourWelcome(props: {
  setShowTour: Dispatch<SetStateAction<boolean>>,
  setTourProgress: Dispatch<SetStateAction<number>>,
}) {
  const setIsMapSidemenuOpen = useSetAtom(isMapSidemenuOpenAtom);

  useEffect(() => {
    setIsMapSidemenuOpen(false);
  }, []);

  return (
    <div className='flex flex-col rounded-lg bg-white p-8 gap-8 text-neutral-600'>
      <span className='font-bold text-4xl'>Pierwszy raz na PinWise?</span>
      <span className='text-neutral-400 text-lg text-center font-light'>
        Tutaj możesz zobaczyć zapotrzebowanie na <br/> usługi w różnych rejonach twojego miasta.
      </span>
      <div className='flex flex-row gap-4 items-center justify-center'>
        <Button 
          className="text-neutral-600"
          type="text" 
          size='large' 
          onClick={() => { 
            localStorage.setItem('finishedTour', 'true'); 
            props.setShowTour(false);
          }}
        >
          Pomiń
        </Button>
        <Button 
          className="font-semibold"
          type="primary" 
          size='large'
          onClick={() => {
            props.setTourProgress(1);
          }}
        >
          Oprowadź mnie
        </Button>
      </div>
    </div>
  );
}

export function TourFirstBubble(props: {
  setTourProgress: Dispatch<SetStateAction<number>>,
}) {
  const setIsMapSidemenuOpen = useSetAtom(isMapSidemenuOpenAtom);
  const setIsServicesSearchOpen = useSetAtom(isServicesSearchOpenAtom);

  useEffect(() => {
    setIsMapSidemenuOpen(true);
    setIsServicesSearchOpen(false);
  }, []);

  return (
    <div className='absolute top-32 start-[416px] flex flex-col rounded-lg bg-white p-4 gap-4 text-neutral-600'>
      <span className="text-justify text-neutral-600 w-[180px]">
        Zacznij od wyszukania firmy lub usługi &#40;np. "Fryzjer"&#41;, która cię interesuje.
      </span>
      <div className="flex flex-row justify-between items-center">
        <Button 
          className="flex flex-row items-center text-neutral-600"
          type="text" 
          size="large"
          onClick={() => {
            props.setTourProgress(0);
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 20 }}/>
        </Button>

        <Button
          className="flex flex-row items-center"
          type="primary" 
          size="large"
          onClick={() => {
            props.setTourProgress(2);
          }}
        >
          <ArrowRightOutlined style={{ fontSize: 20 }}/>
        </Button>
      </div>
    </div>
  );
}

export function TourSecondBubble(props: {
  setTourHidden: Dispatch<SetStateAction<boolean>>,
  setTourProgress: Dispatch<SetStateAction<number>>,
}) {
  const setIsMapSidemenuOpen = useSetAtom(isMapSidemenuOpenAtom);
  const setIsServicesSearchOpen = useSetAtom(isServicesSearchOpenAtom);

  useEffect(() => {
    setIsMapSidemenuOpen(true);
    setIsServicesSearchOpen(true);
  }, []);

  return (
    <div className='absolute top-80 start-[416px] flex flex-col rounded-lg bg-white p-4 gap-4 text-neutral-600'>
      <span className="text-justify text-neutral-600 w-[180px]">
        Wybierz element z listy, a na mapie pojawią się o nim informacje.
      </span>
      <div className="flex flex-row justify-between items-center">
        <Button 
          className="flex flex-row items-center text-neutral-600"
          type="text" 
          size="large"
          onClick={() => {
            props.setTourProgress(1);
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 20 }}/>
        </Button>

        <Button
          className="flex flex-row items-center"
          type="primary" 
          size="large"
          onClick={() => {
            props.setTourHidden(true);
            props.setTourProgress(3);
          }}
        >
          <ArrowRightOutlined style={{ fontSize: 20 }}/>
        </Button>
      </div>
    </div>
  );
}

export function TourThirdBubble(props: {
  setShowTour: Dispatch<SetStateAction<boolean>>,
  setTourProgress: Dispatch<SetStateAction<number>>,
}) {
  const setIsMapSidemenuOpen = useSetAtom(isMapSidemenuOpenAtom);

  useEffect(() => {
    setIsMapSidemenuOpen(true);
  }, []);

  return (
    <div className='absolute top-60 start-[416px] flex flex-col rounded-lg bg-white p-4 gap-4 text-neutral-600'>
      <span className="text-justify text-neutral-600 w-[230px]">
      Możesz włączać i wyłączać odpowiednie widoki, a po zalogowaniu także wyświetlać i dodawać swoje propozycje w postaci pinesek!
      </span>
      <div className="flex flex-row justify-between items-center">
        <Link 
          href={'/map'} 
          onClick={ () => {
            props.setTourProgress(2);
        }}>
          <Button 
            className="flex flex-row items-center text-neutral-600"
            type="text" 
            size="large"
          >
            <ArrowLeftOutlined style={{ fontSize: 20 }}/>
          </Button>
        </Link>
        

        <Button
          className="flex flex-row items-center font-semibold"
          type="primary" 
          size="large"
          onClick={() => {
            localStorage.setItem('finishedTour', 'true'); 
            props.setShowTour(false);
          }}
        >
          Zakończ
        </Button>
      </div>
    </div>
  );
}