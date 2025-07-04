'use client'
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { CompassIcon, GalleryHorizontalEndIcon, LogInIcon, Menu, SearchIcon } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const MenuOptions = [
    {
        title: 'Home',
        icon: SearchIcon,
        path: '/',
    },
    {
        title: 'Discovery',
        icon: CompassIcon,
        path: '/discover',
    },
    {
        title: 'Library',
        icon: GalleryHorizontalEndIcon,
        path: '/library',
    },
    {
        title: 'Sign In',
        icon: LogInIcon,
        path: '/sign-in',
    }
]


function AppSidebar() {

    const pathname = usePathname()
    const {user} = useUser()
    return (
        <Sidebar>
            <SidebarHeader className={'flex items-center py-5'}>
                <Image src='/logo.png' alt='logo' width={200} height={140} />
            </SidebarHeader><SidebarContent><SidebarGroup >
                
                    <SidebarMenu>
                        {MenuOptions.map((menu, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild
                                className={`p-5 py-6 hover:bg-transparent hover:font-bold transition-all
                                ${pathname === menu.path ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'}`}>
                                    <a href={menu.path} className=""><menu.icon className="h-8 w-8" />
                                        <span className="text-lg">{menu.title}</span></a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                  {!user ? <SignUpButton mode='modal'>
                    <Button className={'rounded-full mx-4 mt-4'}>Sign Up</Button>
                </SignUpButton> : <SignOutButton><Button className={'rounded-full mx-4 mt-4'}>Sign Out</Button></SignOutButton>}
            </SidebarGroup></SidebarContent>
            <SidebarFooter className={''}>
                <div className="p-3 flex flex-col">
                    <h2 className="text-gray-500">Try Pro</h2>
                    <p className="text-gray-400">Upgrade for image upload, smarter AI and more Copilot</p>
                    <Button className={'text-gray-500 mb-3'} variant='outline'>Learn More</Button>
<UserButton/>
                </div>


            </SidebarFooter>
        </Sidebar>
    )
}
export default AppSidebar