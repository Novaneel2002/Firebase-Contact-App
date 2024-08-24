import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactvalidation = Yup.object().shape({
    name:Yup.string().required("Name cannot be Empty"),
    Email:Yup.string().email("Invalid Email").required("Email cannot be Empty")
})

const AddandUpdatecontact = ({ contact, isopen, onclose, isupdate }) => {

    const addContact = async (contact) => {
        try {
            const contactref = collection(db, "contacts");
            await addDoc(contactref, contact);

            onclose();
            toast.success("Contact added successfully")
        } catch (error) {
            console.log(error)
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactref = doc(db, "contacts", id);
            await updateDoc(contactref, contact);
            onclose();
            toast.success("Contact updated successfully")
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div>
            <Modal isopen={isopen} onclose={onclose}>
                <Formik validationSchema={contactvalidation} initialValues={isupdate ? {
                    name: contact.name,
                    Email: contact.Email,
                } : {
                    name: "",
                    Email: "",
                }}
                    onSubmit={(values) => { console.log(values); isupdate ?  updateContact(values, contact.id) : addContact(values); }}>
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">

                            <label htmlFor="name">Name</label>
                            <Field name="name" className="h-10 border" />
                            <div className="text-red-700"><ErrorMessage name = "name"/></div>
                        </div>
                        <div className="flex flex-col gap-1">

                            <label htmlFor="Email">Email</label>
                            <Field name="Email" className="h-10 border" />
                            <div className="text-red-700"><ErrorMessage name = "Email"/></div>
                        </div>
                        <button className=" self-end bg-orange px-3 py-1.5 border" >
                            {isupdate ? "update" : "add"} Contact
                        </button>
                    </Form>
                </Formik>


            </Modal>
        </div >
    )
}

export default AddandUpdatecontact;