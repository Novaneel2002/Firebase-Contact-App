import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { RiSearch2Line } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { IoMdContact } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddandUpdatecontact from "./components/AddandUpdatecontact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notfound from "./components/Notfound";


function App() {
  const [contacts, setcontacts] = useState([]);
  const { isopen, onclose, onopen } = useDisclose();
  // const onopen = () => {
  //   setisopen(true);
  // }
  // const onclose = () => {
  //   setisopen(false);
  // }

  useEffect(() => {
    const getcontacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          });
          setcontacts(contactLists);
          return contactLists;
        })


        // console.log(contactLists)

      } catch (error) {
        console.log(error);
      }
    };

    getcontacts();
  }, []);

  const filtercontact = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    // const contactsSnapshot = await getDocs(contactsRef);

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      });

      const filteredcontacts = contactLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
      setcontacts(filteredcontacts);
      return contactLists;
    })


  }
  return (
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar />

      <div className="flex gap-2">
        <div className="relative  flex-grow flex items-center">
          <RiSearch2Line className="mx-1 flex-grow text-white text-3xl absolute" />

          <input onChange={filtercontact} type="text" className="pl-9 text-white flex-grow rounded-md h-10 bg-transparent border border-white" />
        </div>
        <div>
          <IoPersonAdd onClick={onopen} className="text-4xl text-white cursor-pointer" />

        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        { contacts.length <= 0 ? <Notfound/> :
          contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)
        }
      </div>
      <AddandUpdatecontact onclose={onclose} isopen={isopen} />
      <ToastContainer position="bottom-center" />
    </div>
  )

}

export default App;
