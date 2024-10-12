import Image from 'next/image';

export default function Loading() {
  return (
    <div className='flex justify-center mt-16'>
      <Image
        className='h-52'
        src='/spinner.svg' // Use a relative path for your image
        alt='Loading...'
        width={208} // Set the width according to your image's actual dimensions
        height={208} // Set the height according to your image's actual dimensions
      />
    </div>
  );
}
