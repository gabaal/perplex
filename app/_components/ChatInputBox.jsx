'use client'

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightIcon, AtomIcon, AudioLinesIcon, CpuIcon, GlobeIcon, MicIcon, PaperclipIcon, SearchCheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from "@/services/Shared"
import { useState } from "react"
import { supabase } from "@/services/supabase"
import { useUser } from "@clerk/nextjs"
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from "next/navigation"


function ChatInputBox() {
const {user} = useUser()
const [userSearchInput, setUserSearchInput] = useState()
const [loading, setLoading] = useState(false)
const router = useRouter()
const [searchType, setSearchType] = useState('search')
const onSearchQuery = async () => {
    setLoading(true)
    const LibId=uuidv4()
    const {data} = await supabase.from('Library')
    .insert([{
        searchInput: userSearchInput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        type: searchType,
        libId:LibId
    }]).select()
    console.log(data[0])
    router.push('/search/'+LibId)
    setLoading(false)
}
    return (
        <div className="flex flex-col h-screen items-center justify-center w-full">
            <Image src='/logo.png' alt='logo' width={260} height={250} />
            <div className="p-2 w-full max-w-2xl border rounded-2xl mt-10">

                <div className="flex justify-between items-end ">
                    <Tabs defaultValue="Search" className="w-[400px]">
                        <TabsContent value="Search"><input
                            type="text"
                            placeholder="Ask anything"
                            onChange={(e)=> setUserSearchInput(e.target.value)} className="w-full p-4 outline-none" /></TabsContent>
                        <TabsContent value="Research"><input
                            type="text"
                            placeholder="Research anything"
                            onChange={(e)=> setUserSearchInput(e.target.value)} className="w-full p-4 outline-none" /></TabsContent>
                        <TabsList>
                            <TabsTrigger value="Search" className={'text-primary'}
                            onClick ={()=>setSearchType('search')}><SearchCheckIcon /> Search</TabsTrigger>
                            <TabsTrigger value="Research" className={'text-primary'}
                            onClick ={()=>setSearchType('research')}><AtomIcon /> Research</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex gap-4 items-center">


                        <DropdownMenu>
                            <DropdownMenuTrigger><Button variant='ghost'><CpuIcon className="text-gray-500 h-5 w-5" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator /> */}

                                {AIModelsOption.map((model, index) => (
                                    <DropdownMenuItem key={index}><div className="mb-1">
                                        <h2 className="text-sm">{model.name}</h2>
                                        <p className="text-xs">{model.desc}</p>
                                    </div></DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant='ghost'><GlobeIcon className="text-gray-500 h-5 w-5" /></Button>
                        <Button variant='ghost'><PaperclipIcon className="text-gray-500 h-5 w-5" /></Button>
                        <Button variant='ghost'><MicIcon className="text-gray-500 h-5 w-5" /></Button>
                        <Button onClick = {() =>{
                            userSearchInput ?onSearchQuery():null
                        }}>
                            {!userSearchInput ? <AudioLinesIcon className="text-white h-5 w-5" /> : <ArrowRightIcon className="text-white h-5 w-5" disabled={loading}/>}
                        </Button>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default ChatInputBox