import Link from 'next/link';

const Egg = () => {
  return (
    <Link href="https://www.instagram.com/azavadil/" passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '40px',
          height: '40px',
          backgroundColor: 'transparent',
          opacity: 0,
          zIndex: 9999,
          display: 'block',
        }}
        aria-label="Easter Egg Instagram"
        title="Easter Egg"
      />
    </Link>
  );
};

export default Egg;
