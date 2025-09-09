import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../utils/constants';

const Premium = () => {
  const [error, setError] = useState();
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleSubmit = async (type) => {
    try {
      const order = await axios.post(BASE_URL + '/payment/create', { membershipType: type }, { withCredentials: true });
      console.log(order.data);

      // open razorpay payment dialer box
      const options = {
        key: order.data.keyId,
        userId: order.data.userId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: order.data.orderId,
        prefill: {
          name: order.data.notes.firstName + " " + order.data?.notes?.lastName,
          email: order.data?.notes?.email || "",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }


  return (
    <div className='w-full min-h-screen bg-[url("./assets/bg6.jpg")] bg-center bg-no-repeat bg-cover'>
      {isUserPremium ? (
        <div className='text-center pt-4 text-2xl font-bold'>You're are already a premium user</div>
      ) : (
        <div className='w-full min-h-screeen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-3 p-3 pb-20' >
          {error && (
            <div className='text-2xl text-center text-red-500 font-bold'>{error}</div>
          )}

          <div className="card w-90 sm:w-96 bg-base-200 shadow-md">
            <div className="card-body">
              <span className="badge badge-xs badge-warning">Most Popular</span>
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Premium</h2>
                <span className="text-xl"> ₹100/mo</span>
              </div>
              <h2 className="text-2xl font-bold">Gold Plan</h2>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Chat with other</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Blue Tick ✅</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>100+ Connections per Day</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>AI facilty & customer support</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Gender facilty</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className="line-through">Email Support per day</span>
                </li>
              </ul>
              <div className="mt-6 font-bold">
                <button onClick={() => handleSubmit("gold")} className="btn bg-yellow-600 hover:bg-yellow-600 btn-block text-xl font-bold ">Buy Gold</button>
              </div>
            </div>
          </div>


          <div className="card w-90 sm:w-96 bg-base-200 shadow-md m-2">
            <div className="card-body">
              <span className="badge badge-xs badge-success">Common</span>
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Premium</h2>
                <span className="text-xl"> ₹50/mo</span>
              </div>
              <h2 className="text-2xl font-bold">Silver Plan</h2>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Chat with other</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Blue Tick ✅</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>50+ Connections per Day</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>AI facilty</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className='line-through'>Gender facilty</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className="line-through">Email Support per day</span>
                </li>
              </ul>
              <div className="mt-6 font-bold">
                <button onClick={() => handleSubmit("silver")} className="btn bg-zinc-500 hover:bg-zinc-600 btn-block text-xl font-bold ">Buy Silver</button>
              </div>
            </div>
          </div>


          <div className="card w-90 sm:w-96 bg-base-200 shadow-md m-2">
            <div className="card-body">
              <span className="badge badge-xs badge-error">Super Popular</span>
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Premium</h2>
                <span className="text-xl"> ₹30/mo</span>
              </div>
              <h2 className="text-2xl font-bold">Regular Plan</h2>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>Chat with other</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className='line-through'>Blue Tick ✅</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className='line-through'>100+ Connections per Day</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className='line-through'>AI facilty & customer support</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className='line-through'>Gender facilty</span>
                </li>
                <li className="opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className="line-through">Email Support per day</span>
                </li>
              </ul>
              <div className="mt-6 font-bold">
                <button onClick={() => handleSubmit("regular")} className="btn btn-secondary hover:bg-pink-600 btn-block text-xl font-bold ">Buy Regular</button>
              </div>
            </div>
          </div>


          {/* <div className="card w-90 sm:w-96 bg-base-200 shadow-md m-2">
        <div className="card-body">
          <span className="badge badge-xs badge-error">Super Popular</span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Premium</h2>
            <span className="text-xl">₹0</span>
          </div>
          <h2 className="text-2xl font-bold">Gold Plan</h2>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Chat with other</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Blue Tick ✅</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>100+ Connections per Day</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>AI facilty & customer support</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Gender facilty</span>
            </li>
            <li className="opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span className="line-through">Email Support per day</span>
            </li>
          </ul>
          <div className="mt-6 font-bold">
            <button className="btn btn-secondary hover:bg-pink-600 btn-block text-xl font-bold ">Buy Gold</button>
          </div>
        </div>
      </div> */}

          {/* <div className="card w-90 sm:w-96 bg-base-200 shadow-md m-2">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Most Popular</span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Premium</h2>
            <span className="text-xl">$7/mo</span>
          </div>
          <h2 className="text-2xl font-bold">Gold Plan</h2>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Chat with other</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Blue Tick ✅</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>100+ Connections per Day</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>AI facilty & customer support</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>Gender facilty</span>
            </li>
            <li className="opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span className="line-through">Email Support per day</span>
            </li>
          </ul>
          <div className="mt-6 font-bold">
            <button className="btn btn-secondary hover:bg-pink-600 btn-block text-xl font-bold ">Buy Gold</button>
          </div>
        </div>
      </div> */}

        </div>
      )}
    </div>
  )
}

export default Premium;