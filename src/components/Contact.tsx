import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="w-full flex flex-col items-center py-12 px-6">
      <div className="w-full md:w-[80%] flex h-[170vh] md:h-[80vh] flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex flex-col w-full h-full md:w-1/2 items-center gap-4">
          <div className="w-full flex p-2">
            <h1 className="text-4xl font-bold">Where to find us</h1>
          </div>
          <div className="w-full h-full border rounded-3xl border-zinc-200 relative overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dauarqbjt/image/upload/v1736706765/CloseUp_qd1pre.jpg"
              alt="Contact"
              className="w-full h-full object-cover"
              layout="fill"
            />
            <div className="absolute text-white w-full h-full flex flex-col items-start justify-end top-0 left-0 p-10 bg-gradient-to-b from-[#1D4634]/20 to-[#1D4634] rounded-lg">
              <h1 className="text-3xl font-bold pb-4 md:p-6">Contact us</h1>
              <div className="flex items-start flex-col gap-6">
                <div className="flex flex-col items-start md:px-6 gap-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <h1 className="text-lg font-medium">
                      Ph1: +91 9849739981
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <h1 className="text-lg font-medium">
                      Ph2: +91 7075149981
                    </h1>
                  </div>
                </div>

                <div className="flex md:p-6 text-lg flex-col items-start gap-2">
                    <h1 className=" font-medium"><span className="font-bold">Location: </span> Antharam, Vikarabad Road</h1>
                    <h1 className=" font-medium">Telangana, India</h1> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right w-full md:w-1/2 h-full overflow-hidden border border-zinc-300 group rounded-3xl">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31720.09882881035!2d77.8457203769194!3d16.976924065861976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc97ee3c2335adb%3A0x417032325f181e46!2sAntharam%2C%20Telangana%20509335!5e1!3m2!1sen!2sin!4v1736685097375!5m2!1sen!2sin" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            // allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
