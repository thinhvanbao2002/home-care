import Header from './header/header';
import Sidebar from './sidebar/side-bar';

function ManagerLayout({ children }) {
    return (
        <>
            <Sidebar />
            <div className="container">
                <Header />
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default ManagerLayout;
