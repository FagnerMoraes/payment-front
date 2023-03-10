import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ISideBarProps {
    children: React.ReactNode;
  }

  interface IListItemLinkProps{
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
  }

  const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });


    const handleClick = () =>{
      navigate(to);
      onClick?.();
    };
    return(
      <ListItemButton selected={!!match} onClick={handleClick}>
        <ListItemIcon>
            <Icon>{icon}</Icon>                    
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  };


export const SideBar: React.FC<ISideBarProps> = ({children}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
 
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const {toggleTheme} = useAppThemeContext();

  const handleClick = () => {
    setOpen(!open);
  };

    return (
    <>
    <Drawer open={isDrawerOpen} variant={smDown ?'temporary': 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
            <Box width="100%" height={theme.spacing(14)} 
                display="flex" alignItems="Center" justifyContent="center" >
                <Avatar
                sx={{height: theme.spacing(8), width: theme.spacing(8)}} 
                src='https://foto.jpg' />
            </Box>
            <Divider />
            <Box flex={1}>
              <List component="nav">
                  {drawerOptions.map(drawerOption =>(
                    <ListItemLink
                    to={drawerOption.path}
                    key={drawerOption.path}
                    icon={drawerOption.icon}                    
                    label={drawerOption.label}
                    onClick={smDown ? toggleDrawerOpen : undefined}
                    />
                  ))}
                  
              </List>
            </Box>
            <Box>
              <ListItemButton  onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>                    
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
            </Box>   
        </Box>
    </Drawer>
    <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)} >
    {children}
    </Box>
    </>
    
  );
};