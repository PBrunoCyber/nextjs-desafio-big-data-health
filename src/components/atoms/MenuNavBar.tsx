import * as React from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LayoutDashboard, LogOut, ShoppingCart } from 'lucide-react';
import { Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Button from './Button';

interface MenuNavbarProps {
    anchorEl: null | HTMLElement;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    logout: () => void
    className?: string;
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        maxWidth: 240,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function MenuNavbar({ anchorEl, setAnchorEl, logout, className }: MenuNavbarProps) {
    const router = useRouter();
    const open = Boolean(anchorEl);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseCarrinho = () => {
        router.push('/carrinho');
    }

    return (
        <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            disableScrollLock
            onClose={handleClose}
        >
            <MenuItem onClick={handleCloseCarrinho}>
                <p className='text-[#303030] flex gap-[5px] items-center hover:cursor-pointer font-primary'>
                    <ShoppingCart /> Seu Carrinho
                </p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout} className='text-[#FF2313] flex gap-[5px] items-center'><LogOut /> <p>Logout</p></MenuItem>
        </StyledMenu>
    );
}