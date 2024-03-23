import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';

export default function UserLayout({ children }) {
    return (
        <div id="user-page" style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
            <header>
                <span style={{padding: '.2rem'}}>LOGO</span>
            </header>
            <main style={{display:"flex", flex: 1}}>
                <nav style={{width: '20vw'}}>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                User Info
                            </ListItemText>
                        </MenuItem>
                        <MenuItem>
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