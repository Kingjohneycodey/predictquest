import React, { ReactNode } from 'react';

interface UserLayoutProps {
    children: ReactNode;
  }

  const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div>
     <header>Header</header>
     <nav>Sidebar</nav>
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
