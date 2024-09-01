import { Outlet } from 'react-router-dom';
import SideberProfile from './sidebar';
import './profile.css';

function ProfileLayout() {
    return (
        <>
            <div className="container-profile">
                <SideberProfile />
                <Outlet />
            </div>
        </>
    );
}

export default ProfileLayout;
