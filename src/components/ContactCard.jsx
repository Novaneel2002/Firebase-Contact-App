import { IoMdContact } from "react-icons/io";
import { MdDeleteSweep, MdEditSquare } from "react-icons/md";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import AddandUpdatecontact from "./AddandUpdatecontact";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({contact}) => {
    const {isopen, onclose,onopen} = useDisclose();

    const deletecontact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.success("Contact deleted successfully");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div key={contact.id} className="bg-yellow flex justify-between rounded-lg p-2 items-center">


            <div className="flex gap-2 items-center">
                <IoMdContact className="text-orange text-4xl " />
                <div className="">
                    <h2 className="font-medium">{contact.name}</h2>
                    <p className="text-sm">{contact.Email}</p>
                </div>
            </div>


            <div className="flex text-3xl gap-3">
                <MdEditSquare onClick={onopen} className="cursor-pointer"/>
                <MdDeleteSweep onClick={() => deletecontact(contact.id)} className="text-orange cursor-pointer" />

            </div>

        </div>
        <AddandUpdatecontact contact={contact} isupdate isopen={isopen} onclose={onclose} />
        </>

    )
}

export default ContactCard;