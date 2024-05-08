// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Image from "next/image";
// import classcat from "classcat";
// import Link from "next/link";

// const PageHeader = () => {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     console.log("Menu toggled");
//   };

//   const logOut = async () => {
//     try {
//       // sign out logic
//       router.push("/login");
//     } catch (err) {
//       console.error("Error logging out", err);
//     }
//   };
//   return (
//     <nav className="bg-blue-400 fixed top-0 left-0 w-full border-b-2 border-b-white hover:cursor-pointer text-md">
//       <div className="bg-neutral-700 absolute top-0 w-full ">
//         <div className="flex w-full flex-shrink-0 flex-row text-white font-bold text-xl items-center h-16 justify-center ">
//           <div className="flex items-center justify-center text-xl w-full h-16">
//             <Image src="/logo.png" alt="" width={30} height={30} />
//             {/* <span className="hidden md:block"> PinWise </span> */}
//             PinWise
//           </div>
//         </div>
//         <div
//           className="flex text-xl absolute h-16 top-0 w-full items-center"
//           onClick={toggleMenu}
//         >
//           <div className="h-16 flex justify-between items-center w-full">
//             <div>
//               <div className="-mr-2 flex md:hidden text-xl">
//                 <button
//                   className={classcat({
//                     "inline-flex items-center justify-center p-2 rounded-md text-gray-400":
//                       true,
//                     " hover:text-white hover:bg-blue-400": true,
//                     "focus:outline-none focus:bg-blue-400 focus:text-white":
//                       true,
//                   })}
//                   onClick={toggleMenu}
//                 >
//                   <svg
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16m-7 6h7"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex flex-row">
//               <Link
//                 href="/protected/map"
//                 className="text-gray-300 hover:bg-blue-400 hover:text-white px-2 py-2 rounded-md text-base font-medium"
//               >
//                 Map
//               </Link>

//               <div>Log out</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden absolute bg-blue-400 w-full">
//           <div
//             className="px-2 pt-2 pb-3 space-y-1 sm:px-4"
//             onMouseLeave={toggleMenu}
//           >
//             <a
//               href="/protected/map"
//               className="w-full text-gray-300 hover:bg-blue-400 hover:text-white block px-2 py-2 rounded-md text-base font-medium"
//             >
//               Map
//             </a>
//             <hr></hr>
//             <div onClick={() => router.push("/protected/map")}> email </div>
//             <div
//               onClick={logOut}
//               className="flex space-x-2 z-10 w-full align-left text-gray-300 hover:bg-blue-400 hover:cursor-pointer hover:text-white px-2 py-2 rounded-md text-base font-medium"
//             >
//               Log out
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default PageHeader;
