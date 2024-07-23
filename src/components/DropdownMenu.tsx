import Link from "next/link";

export const DropdownMenu = ({ items, isVisible }) => (
    <div
      className={`absolute top-full left-0 mt-2 min-w-[150px] bg-white  shadow-2xl rounded-xl shadow-custom transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {items.map(({ href, label }) => (
        <Link key={href} href={href}>
          <span className='block px-4 py-2 hover:bg-gray-200'>{label}</span>
        </Link>
      ))}
    </div>
  );
  