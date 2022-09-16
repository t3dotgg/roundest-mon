import Footer from './Footer';

type Props = {
  children: JSX.Element;
};

export default function Layout({children}: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};
