import styles from './styles/dashboard.module.css';


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.pageContainer} scrollbar-hide overflow-hidden`}>


      {children}
    </div>
  );
}