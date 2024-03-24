export default function Card({
  room_name,
  price,
  image,
  rating,
  description,
  onClick,
}) {
  return (
    <li class="mx-2 my-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img class="p-2 rounded-t-lg" src={image} alt="product image" />
      </a>
      <div class="px-5 pb-5">
        <a href="">
          <p class="text-xl font-bold">{room_name}</p>
        </a>
        <a href="#">
          <h5 class="text-xl tracking-tight text-gray-900 dark:text-white">
            {description}
          </h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1 rtl:space-x-reverse"></div>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {rating}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClick}
          >
            下單去
          </button>
        </div>
      </div>
    </li>
  );
}
