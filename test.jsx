import Link from "next/link";

const Card = () => {
  return (
    <>
      <article className="flex mt-4 bg-green-100 transition hover:shadow-xl">
        <div className=" rotate-180 p-2 [writing-mode:_vertical-lr]  bg-sky-100 ">
          <time
            dateTime="10-10-2022"
            className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
          >
            <span>10-10-2022 </span>
            <span className="w-px flex-1 bg-gray-900/10"></span>
            <span className=" text-red-700">Monday</span>
          </time>
        </div>

        <div className="flex flex-1  flex-col justify-between">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <Link href="#">
              <h3 className="font-bold uppercase text-xl text-gray-900">
                Active user
              </h3>
            </Link>

            <p className="mt-2 line-clamp-5 lg:line-clamp-6 text-sm/relaxed text-gray-700">
              90
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Card;
