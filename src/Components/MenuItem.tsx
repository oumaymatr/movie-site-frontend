import Link from 'next/link';

interface MenuItemProps {
  title: string; // Title of the menu item
  address: string; // Address (URL) to link to
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component type
}

const MenuItem: React.FC<MenuItemProps> = ({ title, address, Icon }) => {
  return (
    <Link href={address} className='hover:text-amber-500'>
      <Icon className="text-2xl sm:hidden"/>
      <p className='uppercase hidden sm:inline text-m'>{title}</p>
    </Link>
  );
};

export default MenuItem;
