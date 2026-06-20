'use client'
import { useSession } from "@/lib/auth-client";
import { House,  } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { FaEdit, FaUser, FaUsers } from "react-icons/fa";
import { FaHand } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export default function DashboardSideBar() {
    const {data: session, isPending} = useSession();
    if(isPending){
        return <div>Loading....</div>
    }
    const user = session?.user;
    console.log(user);
    // const session = await getUserSession();
    // // সেশন থেকে ইউজার অবজেক্ট বের করা এবং সেফটি হ্যান্ডেল করা
    // const user = session?.user || session; 

    const volunteerNavLinks = [
        { icon: House, href: '/dashboard/volunteer', label: "Dashboard" },
        { icon: FaUser, href: '/dashboard/volunteer/my-profile', label: "My Profile" },
        { icon: FaHand, href: '/dashboard/volunteer/my-requests', label: "MY Requests" },
        { icon: FaEdit, href: '/dashboard/volunteer/create-request', label: "Create Request" },
        { icon: FaUsers, href: '/dashboard/volunteer/public-requests', label: "Public Requests" }
    ];

    const donorNavLinks = [
        { icon: House, href: '/dashboard/donor', label: "Dashboard" },
        { icon: FaUser, href: '/dashboard/donor/my-profile', label: "My Profile" },
        { icon: FaHand, href: '/dashboard/donor/my-requests', label: "MY Requests" },
        { icon: FaEdit, href: '/dashboard/donor/create-request', label: "Create Request" }
    ];

    const adminNavLinks = [
        { icon: House, href: '/dashboard/admin', label: "Dashboard" },
        { icon: FaUser, href: '/dashboard/admin/my-profile', label: "My Profile" },
        { icon: FaHand, href: '/dashboard/admin/my-requests', label: "MY Requests" },
        { icon: FaEdit, href: '/dashboard/admin/cancle-request', label: "Cancle Request" },
        { icon: FaUsers, href: '/dashboard/admin/all-users', label: "All Users" },
        { icon: FaUsers, href: '/dashboard/admin/public-requests', label: "Public Requests" }
    ];

    const navLinksMap = {
        donor: donorNavLinks,
        volunteer: volunteerNavLinks,
        admin: adminNavLinks
    };

    // নিশ্চিত করা হচ্ছে যে ইউজার রোল ম্যাচ না করলে বা আনঅথরাইজড হলে ডিফল্ট 'seekerNavLinks' পাবে
    // const currentRole = user?.role === 'recruiter' ? 'recruiter' : 'seeker';
    // const navItems = navLinksMap[currentRole] || seekerNavLinks;
    const navItems = navLinksMap[user?.role || 'donor']

    const navContent = (
        <nav className="flex flex-col bg-[#4a4a4d] gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 text-white rounded-xl px-2 py-2.5 bg-[#4a4a4d] text-sm transition-colors cursor-pointer hover:bg-default hover:text-black"
                    href={item.href}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className="hidden w-48 shrink-0 border-r bg-[#4a4a4d] h-full py-4 pl-6 pr-4 lg:block">
                {navContent}
            </aside>
            <Drawer className='bg-[#4a4a4d]'>
                <Button variant="secondary" className="lg:hidden bg-[#4a4a4d] text-white">
                    <TbLayoutSidebarLeftCollapse className="pl-2  w-10" size="25" />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left" className="bg-[#4a4a4d] text-white w-28 ">
                        <Drawer.Dialog className=" bg-[#4a4a4d] text-white">
                            <Drawer.CloseTrigger />
                            <Drawer.Header className="bg-[#4a4a4d]">
                                <Drawer.Heading className="bg-[#4a4a4d] text-white text-lg">Dashboard Sidebar</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body className="bg-[#4a4a4d]">
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}


