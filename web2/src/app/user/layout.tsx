"use client";

import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import { useRouter } from "next/navigation";
import Header from "../component/Header";

export default function UserLayout({ children }) {

    const router = useRouter();

    return (
        <div id="user-page" style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
            <Header/>
            <main style={{display:"flex", flex: 1}}>
                <nav style={{width: '20vw'}}>
                    <MenuList>
                        <MenuItem onClick={() => {router.push('/user/info')}}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                User Info
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => {router.push('/user/records')}}>
                            <ListItemIcon>
                                <NotesIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Records
                            </ListItemText>
                        </MenuItem>
                    </MenuList>
                </nav>
                <div style={{flex: 1}}>
                    {children}
                </div>
            </main>
        </div>
    )
}