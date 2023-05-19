import { Navbar } from '@/components';
import styles from './styles/info.module.css';


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.pageContainer} h-full text-white`}>
      <div >
        <Navbar />
      </div>


      {children}
    </div>
  );
}