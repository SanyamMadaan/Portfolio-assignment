import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const Contact = () => {
  //states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [button,setButton]=useState("Submit");

  const val=useRef();
  const SendEmail = async (e) => {
    setButton("Submitting....");
    e.preventDefault();
    console.log(email);
    console.log(name);
    console.log(subject);
    console.log(message);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}}/submit`, {
        email,
        name,
        subject,
        message,
      });
      if (response.status == 200) {
        alert("Details Submitted Successfully..We Will Contact You Soon");
        setButton("Submit");
        setEmail("");
        setName("");
        setSubject("");
        setMessage("");
      }
    } catch (e) {
      console.log(e);
      alert("Server is Down.. Please Try again later");
      setButton("Submit");
    }
  };

  return (
    <div
      id="contact"
      className="flex justify-center items-center flex-col mt-20  px-4 "
    >
      <h1 className="lg:text-5xl md:text-5xl text-3xl mt-10 font-medium text-center">Contact</h1>
      <h2 className="text-center mt-4 text-xl lg:text-2xl md:text-2xl">
        Feel free to reach out to me for any questions or opportunities
      </h2>
      <div className="border-2 w-full md:w-3/4 lg:w-1/2 border-white flex flex-col p-8 justify-center items-center rounded-md bg-zinc-900 mt-8 mb-4">
        <form onSubmit={SendEmail} className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 mt-2 mb-4 p-2 rounded-md text-black text-xl"
            type="text"
            placeholder="Your Email"
            required
          />
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 mt-2 mb-4 p-2 rounded-md text-black text-xl"
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-12 mt-2 mb-4 p-2 rounded-md text-black text-xl"
            type="text"
            placeholder="Subject"
            required
          />
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-18 mt-2 mb-4 p-2 rounded-md text-black text-xl"
            placeholder="Message"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full h-18 bg-gradient-to-r from-pink-500 to-indigo-600 border-2 border-white p-2 rounded-md mb-2 mt-2 cursor-pointer"
          >
            {button}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
