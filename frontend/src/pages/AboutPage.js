import React from "react";

function About() {
  return (
    <div className="bg-white flex justify-center items-center">
      {/* <div className="w-1/2 flex-col justify-center items-center bg-white p-6 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
      <div className="w-1/2 sm:w-full flex-col justify-center items-center bg-white p-6 md:p-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <br />
        <div>
          {/* <h1 className="headlogo text-5xl font-extrabold text-center mb-.5"> */}
          <h1 className="headlogo text-5xl sm:text-4xl font-extrabold text-center mb-.5">
            About
          </h1>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-1 sm:py-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>

              <h1 className="headlogo text-3xl font-bold lead text-gray-900 dark:text-white mb-.5">
                Our Mission
              </h1>
            </li>
            <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
              At SR, we understand the joy of exploring new cultures through
              food. Our mission is to make your dining experience in Suwon,
              Korea, enjoyable and accessible, especially for those who are new
              to the country and may face language barriers.
            </p>
            <br />
            <li className="py-1 sm:py-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <h1 className="headlogo text-3xl font-bold lead text-gray-900 dark:text-white mb-.5">
                Discover Suwon's Culinary Delights
              </h1>
            </li>
            <div className="flex flex-col">
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                We focus on providing restaurant information in English,
                ensuring that foreigners can easily access details about various
                dining establishments in Suwon. Whether you're a visitor or a
                resident, our goal is to make your time in Korea memorable and
                hassle-free.
              </p>
            </div>

            <br />
            <li className="py-1 sm:py-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>

              <h1 className="headlogo text-3xl font-bold lead text-gray-900 dark:text-white mb-.5">
                What We Offer
              </h1>
            </li>
            <div className="flex flex-col">
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                Restaurant Info in English:
              </p>
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                We've curated a list of restaurants in Suwon, offering English
                descriptions to help you understand the specialties and
                ambiance.
              </p>
              <br />
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                Easy Navigation:
              </p>
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                Our user-friendly interface allows you to quickly find
                information about the best dining spots in the city.
              </p>
              <br />
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                Limited but Growing:
              </p>
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                Currently, we showcase a select number of restaurants, but our
                vision is to expand our database to cover as many dining options
                as possible in the future.
              </p>
            </div>
            <br />

            <li className="py-1 sm:py-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>

              <h1 className="headlogo text-3xl font-bold lead text-gray-900 dark:text-white mb-.5">
                Explore Further
              </h1>
            </li>
            <div className="flex flex-col">
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                For more detailed information or if you'd like to explore
                additional restaurants beyond Suwon, you can visit the original
                Naver website. Keep in mind that the content on Naver is
                primarily in Korean, so our platform serves as a helpful bridge
                for English speakers.
              </p>
            </div>
            <br />

            <li className="py-1 sm:py-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-9 h-9 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>

              <h1 className="headlogo text-3xl font-bold lead text-gray-900 dark:text-white mb-.5">
                Contact Us
              </h1>
            </li>
            <div className="flex flex-col">
              <p class="text-xl text-gray-500 dark:text-gray-400 ml-2">
                Have suggestions, feedback, or questions? We'd love to hear from
                you! Reach out to us at fabpark93@gmail.com. Thank you for
                choosing SR! We hope you have a delightful culinary journey in
                Suwon, Korea.
              </p>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
