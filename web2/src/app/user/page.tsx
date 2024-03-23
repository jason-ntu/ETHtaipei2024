import { MenuItem, MenuList } from "@mui/material";

const UserPage = () => {
    return (
        <div id="user-page">
            <header>
                <span>LOGO</span>
            </header>
            <main style={{display:"flex"}}>
                <nav style={{width: '20vw'}}>
                    <MenuList>
                        <MenuItem>
                            User Info
                        </MenuItem>
                    </MenuList>
                </nav>
                <div style={{flex: 1}}>

                </div>
            </main>
        </div>
    )
}

export default UserPage;